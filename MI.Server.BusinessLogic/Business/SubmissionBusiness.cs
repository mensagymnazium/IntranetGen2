using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml.Schema;
using AutoMapper;
using MI.Server.BusinessLogic.DTO;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
using MI.Server.DataAccess.DbObjects.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using Microsoft.Extensions.Configuration;

namespace MI.Server.BusinessLogic.Business
{
	public class SubmissionBusiness
	{
		private readonly MensaIntranetContext _context;
		private readonly IMapper _mapper;
		private readonly IConfiguration _config;

		internal SubmissionBusiness(MensaIntranetContext context, IMapper mapper, IConfiguration config)
		{
			_context = context;
			_mapper = mapper;
			_config = config;
		}

		public async Task<SubmissionDto> GetById(int id)
		{
			var submissioDb = await _context.Submissions.FirstAsync(x => x.Id == id);
			return _mapper.Map<SubmissionDto>(submissioDb);
		}

		public async Task InsertOrUpdateSubmissionAsync(string filePath, string userName, AssignmentDb assignment)
		{
			if (assignment == null)
			{
				throw new InvalidOperationException("You can't upload file to non existing assignment.");
			}

			var userDb = await _context.Users.SingleOrDefaultAsync(x => x.Email == userName).ConfigureAwait(false);
			if (userDb == null)
			{
				throw new InvalidOperationException("User with this email does not exist.");
			}

			if (userDb.Group != ProgrammingGroup.Admin && assignment.Group != userDb.Group)
			{
				throw new InvalidOperationException("You can't upload submission to this assignment.");
			}

			ProcessAsyncHelper.ProcessResult result = new ProcessAsyncHelper.ProcessResult();
			int score = 0;
			var temp = "";
			try
			{
				temp = Path.Combine(_config["SavePath"], "temp", userName);
				if (!Directory.Exists(temp))
				{
					Directory.CreateDirectory(temp);
				}

				ZipFile.ExtractToDirectory(assignment.SolutionPath, temp);
				var directories = Directory.GetDirectories(temp);
				result = await ProcessFileAsync(directories[0], filePath).ConfigureAwait(false);
				double d = (double.Parse(result.PassedTest) / double.Parse(result.MaxTest)) * 100;
				score = (int)Math.Round(d);

			}
			catch (Exception e)
			{
				throw new Exception(e.Message);
			}
			finally
			{
				Directory.Delete(temp, true);
			}


			var submissionInDb = await _context.Submissions.SingleOrDefaultAsync(x => x.User.Email == userName && x.Assignment.Id == assignment.Id).ConfigureAwait(false);

			if (submissionInDb == null)
			{
				var submissionDb = new SubmissionDb()
				{
					FilePath = filePath,
					Assignment = assignment,
					NumberOfUploads = 1,
					ResultMessage = result.Output,
					UploadTime = DateTime.Now,
					Score = score,
					User = userDb
				};
				await _context.Submissions.AddAsync(submissionDb).ConfigureAwait(false);
			}
			else
			{
				if (assignment.MaxNumberOfUploads == submissionInDb.NumberOfUploads)
				{
					throw new InvalidOperationException("Maximum number of uploads exceeded.");
				}
				try
				{
					File.Delete(submissionInDb.FilePath);
				}
				catch (Exception e)
				{
					Console.WriteLine(e);
					throw;
				}
				submissionInDb.FilePath = filePath;
				submissionInDb.UploadTime = DateTime.Now;
				submissionInDb.NumberOfUploads++;
				submissionInDb.Score = score;
				submissionInDb.ResultMessage = result.Output;
				_context.Submissions.Update(submissionInDb);
			}
			await _context.SaveChangesAsync().ConfigureAwait(false);
		}

		public async Task<ProcessAsyncHelper.ProcessResult> ProcessFileAsync(string solutionPath, string submissionPath)
		{
			var extractedPath = Path.Combine(solutionPath, "Extracted");
			try
			{
				if (Directory.Exists(extractedPath))
				{
					Directory.Delete(extractedPath, true);
				}

				Directory.CreateDirectory(extractedPath);
			}
			catch (Exception)
			{
				return new ProcessAsyncHelper.ProcessResult()
				{
					Completed = true,
					ExitCode = 1,
					Output = "Problem with the extracted content."
				};
			}

			ZipFile.ExtractToDirectory(submissionPath, extractedPath);

			var csFiles = Directory.GetFiles(extractedPath, "*.cs", SearchOption.AllDirectories);
			if (csFiles.Length == 0)
			{
				return new ProcessAsyncHelper.ProcessResult
				{
					Completed = true,
					ExitCode = 1,
					Output = "No .cs file found"
				};
			}
			foreach (var file in csFiles)
			{
				var destPath = Path.Combine(extractedPath, Path.GetFileName(file));
				try
				{
					if (!File.Exists(file))
					{
						File.Copy(file, destPath);
					}
				}
				catch (Exception)
				{
					return new ProcessAsyncHelper.ProcessResult()
					{
						Completed = true,
						ExitCode = 1,
						Output = "Problem with the extracted content."
					};
				}
			}

			var solutionFile = Directory.GetFiles(solutionPath, "*.sln");
			if (solutionFile.Length != 1)
			{
				throw new InvalidOperationException();
			}

			var result = await ProcessAsyncHelper.ExecuteShellCommand("dotnet", $"test  \"{solutionFile[0]}\" ", 180000);

			if (result.Completed)
			{
				var te = "Starting test execution, please wait.";
				if (result.Output.Contains(te))
				{
					var index = result.Output.IndexOf(te);
					result.Output = result.Output.Substring(index);
					var error = "Error Message:";
					var stackTrace = "Stack Trace";
					var list = new List<string>();
					if (result.Output.Contains(error))
					{
						list = result.Output.ExtractFromBody(error, stackTrace);
					}

					var total = "Total tests";
					var seconds = "Seconds";
					if (result.Output.Contains(total))
					{
						var index1 = result.Output.IndexOf(total);
						var index2 = result.Output.IndexOf(seconds);
						int length = index2 - index1 + seconds.Length;
						var s = result.Output.Substring(index1, length);


						var maxTests = s.ExtractFromBody("Total tests:", "Passed").FirstOrDefault().Replace(Environment.NewLine, "");
						var findString = "Failed";
						if (!s.Contains(findString))
						{
							findString = "Total time";
						}

						var passedTests = s.ExtractFromBody("Passed:", findString).FirstOrDefault().Replace(Environment.NewLine, "");
						var time = s.ExtractFromBody("Total time:", "Seconds").FirstOrDefault().Trim();
						result.Time = time;
						result.MaxTest = maxTests.Trim();
						result.PassedTest = passedTests.Trim();

						list.Add(s);
					}

					result.Output = string.Join(Environment.NewLine, list);
				}
			}

			Directory.Delete(extractedPath, true);

			return result;
		}
	}
}