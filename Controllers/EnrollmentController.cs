using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.DTO;
using MI.Server.BusinessLogic.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentController : ControllerBase
    {
        private readonly BusinessManager _manager;
        public EnrollmentController(BusinessManager manager)
        {
            _manager = manager;
        }

        [HttpGet("subject/{id}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetBySubjectId(int id)
        {
            try
            {
                return await _manager.SignupBusiness.StudentBySubject(id);
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("student/{id}")]
        public async Task<ActionResult<IEnumerable<SubjectDto>>> GetByStudentId(int id)
        {
            try
            {
                return await _manager.SignupBusiness.SubjectsByStudent(id);
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        

        //[HttpDelete({studentId}/{subjectId}")]
        //public async Task<ActionResult> Delete(int studentId, int subjectId)
        //{
        //    try
        //    {
        //        var userDb = await _manager.UserBusiness.GetUserDbByMail("s");
        //        await _manager.SignupBusiness.DeleteSignup(userDb, subjectId);
        //        return Ok();
        //    }
        //    catch (NotFoundException e)
        //    {
        //        return NotFound(e.Message);
        //    }
        //}
    }
}
