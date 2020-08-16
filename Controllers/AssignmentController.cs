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
            return await _manager.AssignmentBusiness.GetAssignmentsByUserName(User.Identity.Name);
        }
    }
}
