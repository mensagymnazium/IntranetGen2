using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionController : ControllerBase
    {
        private readonly BusinessManager _manager;

        public SubmissionController(BusinessManager manager)
        {
            _manager = manager;
        }

        [HttpPost("{assignmentId}")]
        [Authorize]
        public async Task<IActionResult> InsertSubmission([FromRoute] int assignmentId)
        {
            try
            {
                var postedFile = Request.Form.Files[0];

                if (postedFile.Length > 0)
                {
                    var assignment = await _manager.AssignmentBusiness.GetAssignmentById(assignmentId);
                    var filePath =
                        await SaveFileAsync(postedFile, User.Identity.Name, assignment.Name).ConfigureAwait(false);
                    await _manager.SubmissionBusiness.InsertOrUpdateSubmissionAsync(filePath, User.Identity.Name,
                        assignment).ConfigureAwait(false);
                }

                return Ok($"File is uploaded Successfully");
            }
            catch (Exception)
            {
                return StatusCode(500, $"Some Error Occcured while uploading File");
            }
        }

        public async Task<string> SaveFileAsync(IFormFile postedFile, string userName, string assignmentName)
        {
            var fileName = ContentDispositionHeaderValue.Parse(postedFile.ContentDisposition).FileName.Trim('"');
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles", assignmentName, userName);
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
