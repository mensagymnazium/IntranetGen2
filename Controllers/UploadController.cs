using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.DataAccess.DbObjects.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly BusinessManager _manager;
        public UploadController(BusinessManager manager)
        {
            _manager = manager;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SignUpToSubject()
        {
            try
            {
                var postedFile = Request.Form.Files[0];
                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles", User.Identity.Name, Guid.NewGuid().ToString() );
                Directory.CreateDirectory(uploadFolder);
                if (postedFile.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(postedFile.ContentDisposition)
                        .FileName.Trim('"');
                    var finalPath = Path.Combine(uploadFolder, fileName);
                    using (var fileStream = new FileStream(finalPath, FileMode.Create))
                    {
                        await postedFile.CopyToAsync(fileStream);
                    }

                    await _manager.UploadBusiness.ProcessFile(uploadFolder, finalPath);

                    return Ok($"File is uploaded Successfully");
                }
                else
                {
                    return BadRequest("The File is not received.");
                }


            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Some Error Occcured while uploading File {ex.Message}");
            }
        }
    }
}
