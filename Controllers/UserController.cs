using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.DTO;
using MI.Server.BusinessLogic.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly BusinessManager _manager;
        public UserController(BusinessManager manager)
        {
            _manager = manager;
        }

        [HttpPut]
        [Consumes(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> InsertOrUpdateUser(UserDto userDto)
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

        [HttpPost("subject/{subjectId}")]
        public async Task<IActionResult> SignUpToSubject([FromRoute]int subjectId)
        {
            try
            {
                var userDb = await _manager.UserBusiness.GetUserDbByMail(User.Identity.Name);
                await _manager.SignupBusiness.CreateSignup(userDb, subjectId);
                return Ok();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("subject/{subjectId}")]
        public async Task<IActionResult> UnSignUpSubject([FromRoute]int subjectId)
        {
            try
            {
                var userDb = await _manager.UserBusiness.GetUserDbByMail(User.Identity.Name);
                await _manager.SignupBusiness.DeleteSignup(userDb, subjectId);
                return Ok();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("subjects")]
        public async Task<ActionResult<IEnumerable<SubjectDto>>> GetByStudentId()
        {
            try
            {
                var userDb = await _manager.UserBusiness.GetUserDbByMail(User.Identity.Name);
                return await _manager.SignupBusiness.SubjectsByStudent(userDb.Id);
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}