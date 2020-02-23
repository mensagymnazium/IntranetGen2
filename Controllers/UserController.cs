using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly BusinessManager _manager;
        public UserController(BusinessManager manager)
        {
            _manager = manager;
        }

        [HttpPut]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> PutUser(UserDto userDto)
        {
            try
            {
                await _manager.UserBusiness.InsertOrUpdateUserDb(userDto);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}