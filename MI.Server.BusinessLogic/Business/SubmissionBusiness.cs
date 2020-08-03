using System;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Xml.Schema;
using AutoMapper;
using MI.Server.BusinessLogic.DTO;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;

namespace MI.Server.BusinessLogic.Business
{
    public class SubmissionBusiness
    {
        private readonly MensaIntranetContext _context;
        private readonly IMapper _mapper;

        internal SubmissionBusiness(MensaIntranetContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task InsertOrUpdateSubmissionAsync(string filePath, string userName, int assignmentId)
        {
            var assignment = await _context.Assignments.SingleOrDefaultAsync(x => x.Id == assignmentId).ConfigureAwait(false);
            if (assignment == null)
                throw new InvalidOperationException("You can't upload file to non existing assignment.");

            var userDb = await _context.Users.SingleOrDefaultAsync(x => x.Email == userName).ConfigureAwait(false);
            if(userDb == null)
                throw new InvalidOperationException("User with this email does not exist.");

            var result = await ProcessFileAsync(assignment.SolutionPath, filePath).ConfigureAwait(false);

            var submissionInDb = await _context.Submissions.SingleOrDefaultAsync(x => x.User.Email == userName && x.Assignment.Id == assignmentId).ConfigureAwait(false);

            if (submissionInDb == null)
            {
                var submissionDb = new SubmissionDb()
                {
                    FilePath = filePath,
                    Assignment = assignment,
                    NumberOfUploads = 1,
                    ResultMessage = result.Output,
                    UploadTime = DateTime.Now,
                    User = userDb
                };
                await _context.Submissions.AddAsync(submissionDb).ConfigureAwait(false);
            }
            else
            {
                submissionInDb.FilePath = filePath;
                submissionInDb.UploadTime = DateTime.Now;
                submissionInDb.NumberOfUploads++;
                submissionInDb.ResultMessage = result.Output;
                _context.Submissions.Update(submissionInDb);
            }
            await _context.SaveChangesAsync().ConfigureAwait(false);
        }

        public async Task<ProcessAsyncHelper.ProcessResult> ProcessFileAsync(string solutionPath, string submissionPath)
        {
            var extractedPath = Path.Combine(Path.GetDirectoryName(solutionPath) ?? throw new InvalidOperationException(), "Extracted");
            try
            {
                if (Directory.Exists(extractedPath))
                    Directory.Delete(extractedPath, true);
                Directory.CreateDirectory(extractedPath);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
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
                    File.Copy(file, destPath);

                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }

            var result = await ProcessAsyncHelper.ExecuteShellCommand("dotnet", $"test  \"{solutionPath}\" ", 60000);

            Directory.Delete(extractedPath,true);

            return result;
        }
    }
}