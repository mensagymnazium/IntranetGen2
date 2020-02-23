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
    public class SignupController : ControllerBase
    {
        private readonly BusinessManager _manager;
        public SignupController(BusinessManager manager)
        {
            _manager = manager;
        }

        [HttpGet("subject/{id}")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetBySubjectId(int id)
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
        public async Task<ActionResult<IEnumerable<SubjectDTO>>> GetByStudentId(int id)
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

        [HttpPut("{studentId}-{subjectId}")]
        public async Task<ActionResult> Put(int studentId, int subjectId)
        {
            try
            {
                await _manager.SignupBusiness.CreateSignup(studentId, subjectId);
                return NoContent();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("{studentId}-{subjectId}")]
        public async Task<ActionResult> Delete(int studentId, int subjectId)
        {
            try
            {
                await _manager.SignupBusiness.DeleteSignup(studentId, subjectId);
                return NoContent();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
