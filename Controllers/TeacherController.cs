using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.DTO;
using Microsoft.AspNetCore.Mvc;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    public class TeacherController : Controller
    {
        private readonly BusinessManager _manager;
        public TeacherController(BusinessManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public async Task<List<TeacherDTO>> Get()
        {
            return await _manager.TeacherBusiness.GetTeachers();
        }
    }
}
