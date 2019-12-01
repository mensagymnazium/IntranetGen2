using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
using MI.Server.BusinessLogic;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly BusinessManager _manager;

        public TestController(BusinessManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public async Task<ActionResult<object>> Count()
        {
            return new { a = 10, b = "Hello", c = new { a = "Banana" }, d = new string[] { "Hello", "world" } };
        }

        [HttpPost]
        public async Task<IActionResult> Insert()
        {
            await _manager.SubjectBusiness.CreateSubject();
            return NoContent();
        }
    }
}
