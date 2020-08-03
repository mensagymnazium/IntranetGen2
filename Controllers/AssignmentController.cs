using System;
using System.Collections.Generic;
using System.Linq;
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
    public class AssignmentController : ControllerBase
    {
        private readonly BusinessManager _manager;

        public AssignmentController(BusinessManager manager)
        {
            _manager = manager;
        }
        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<AssignmentDto>> Get()
        {
            //var list = new List<AssignmentDto>
            //{
            //    new AssignmentDto()
            //    {
            //        Name = "Shit1",
            //        Deadline = DateTime.Now,
            //        MaxNumberOfUploads = 5,
            //        Required = true
            //    },
            //    new AssignmentDto()
            //    {
            //        Name = "Shit2",
            //        Deadline = DateTime.Now,
            //        MaxNumberOfUploads = 5,
            //        Required = true
            //    },
            //    new AssignmentDto()
            //    {
            //        Name = "Shit3",
            //        Deadline = DateTime.Now,
            //        MaxNumberOfUploads = 5,
            //        Required = true
            //    },
            //    new AssignmentDto()
            //    {
            //        Name = "Shit4",
            //        Deadline = DateTime.Now,
            //        MaxNumberOfUploads = 5,
            //        Required = true
            //    },
            //    new AssignmentDto()
            //    {
            //        Name = "Shit5",
            //        Deadline = DateTime.Now,
            //        MaxNumberOfUploads = 5,
            //        Required = true
            //    },
            //};

            return await _manager.AssignmentBusiness.GetAssignments();
        }
    }
}
