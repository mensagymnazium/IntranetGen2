using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MI.Server.BusinessLogic.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        [HttpGet]
        [Authorize]
#pragma warning disable 1998
        public async Task<IEnumerable<AssignmentDto>> Get()
#pragma warning restore 1998
        {
            var list = new List<AssignmentDto>
            {
                new AssignmentDto()
                {
                    Name = "Shit1",
                    Deadline = DateTime.Now,
                    ActiveFrom = DateTime.Today,
                    MaxNumberOfUploads = 5,
                    Required = true
                },
                new AssignmentDto()
                {
                    Name = "Shit2",
                    Deadline = DateTime.Now,
                    ActiveFrom = DateTime.Today,
                    MaxNumberOfUploads = 5,
                    Required = true
                },
                new AssignmentDto()
                {
                    Name = "Shit3",
                    Deadline = DateTime.Now,
                    ActiveFrom = DateTime.Today,
                    MaxNumberOfUploads = 5,
                    Required = true
                },
                new AssignmentDto()
                {
                    Name = "Shit4",
                    Deadline = DateTime.Now,
                    ActiveFrom = DateTime.Today,
                    MaxNumberOfUploads = 5,
                    Required = true
                },
                new AssignmentDto()
                {
                    Name = "Shit5",
                    Deadline = DateTime.Now,
                    ActiveFrom = DateTime.Today,
                    MaxNumberOfUploads = 5,
                    Required = true
                },
            };
            return list;
        }
    }
}
