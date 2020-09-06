using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionController : ControllerBase
    {
        private readonly BusinessManager _manager;
        private readonly IConfiguration _config;

        public SubmissionController(BusinessManager manager, IConfiguration config)
        {
            _manager = manager;
            _config = config;
        }

        [HttpPost("{assignmentId}")]
        [Authorize]
        public async Task<IActionResult> InsertSubmission([FromRoute] int assignmentId)
        {
            try
            {
                var assignment = await _manager.AssignmentBusiness.GetAssignmentById(assignmentId);
                if (assignment == null)
                    return BadRequest($"Uploading to not existing assignment");

                if (assignment.Deadline < DateTime.Now)
                    return StatusCode(406,"Uploading after deadline.");

                var postedFile = Request.Form.Files[0];

                if (postedFile.Length > 0)
                {
                    var filePath =
                        await SaveFileAsync(postedFile, User.Identity.Name, assignment.Name).ConfigureAwait(false);
                    await _manager.SubmissionBusiness.InsertOrUpdateSubmissionAsync(filePath, User.Identity.Name,
                        assignment).ConfigureAwait(false);
                }

                return Ok($"File is uploaded Successfully");
            }
            catch (InvalidOperationException exception)
            {
                return Ok(exception.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, $"Some Error Occcured while uploading File");
            }
        }

        public async Task<string> SaveFileAsync(IFormFile postedFile, string userName, string assignmentName)
        {
            var fileName = ContentDispositionHeaderValue.Parse(postedFile.ContentDisposition).FileName.Trim('"');
            var uploadFolder = Path.Combine(_config["SavePath"], assignmentName, userName);
            Directory.CreateDirectory(uploadFolder);
            var finalPath = Path.Combine(uploadFolder, fileName);
            using (var fileStream = new FileStream(finalPath, FileMode.Create))
            {
                await postedFile.CopyToAsync(fileStream);
            }

            return finalPath;
        }
    }
}
