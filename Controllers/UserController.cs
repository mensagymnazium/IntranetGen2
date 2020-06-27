using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.DTO;
using MI.Server.BusinessLogic.Exceptions;
using MI.Server.DataAccess.DbObjects.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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

        [HttpGet]
        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IEnumerable<UserDto>> Get()
        {
            var students = await _manager.UserBusiness.GetStudents();
            foreach(var student in students)
            {
                student.PrimarySubjects = await _manager.SignupBusiness.SubjectsByStudentAndPriority(student.Id, Priority.Primary);
                student.SecondarySubjects = await _manager.SignupBusiness.SubjectsByStudentAndPriority(student.Id, Priority.Secondary);
            }
            await _manager.SigningRulesBusiness.SetSigningDone(students);

            return students;
        }

        [HttpPut]
        [Consumes(MediaTypeNames.Application.Json)]
        [Authorize]
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
        [Authorize]
        public async Task<IActionResult> SignUpToSubject([FromRoute]int subjectId,[FromBody] Priority priority )
        {
            try
            {
                var userDb = await _manager.UserBusiness.GetUserDbByMail(User.Identity.Name);
                var subjectDto = await _manager.SubjectBusiness.GetSubjectById(subjectId);
                var canSign = await _manager.SigningRulesBusiness.CanSign(userDb, subjectDto, priority);
                if (canSign)
                {
                    await _manager.SignupBusiness.CreateSignup(userDb, subjectId, priority);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("subject/{subjectId}")]
        [Authorize]
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

        [HttpGet("my/subjects")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<SubjectDto>>> GetByStudent()
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

        [HttpGet("my/subjects/primary")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<string>>> GetByStudentPrimary()
        {
            try
            {
                var userDb = await _manager.UserBusiness.GetUserDbByMail(User.Identity.Name);
                return await _manager.SignupBusiness.SubjectsByStudentAndPriority(userDb.Id, Priority.Primary);
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("my/subjects/secondary")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<string>>> GetByStudentSecondary()
        {
            try
            {
                var userDb = await _manager.UserBusiness.GetUserDbByMail(User.Identity.Name);
                return await _manager.SignupBusiness.SubjectsByStudentAndPriority(userDb.Id, Priority.Secondary);
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("subjects")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<SubjectDto>>> GetAllAvailableSubjects()
        {
            try
            {
                var userDb = await _manager.UserBusiness.GetUserDbByMail(User.Identity.Name);

                var subjects = await _manager.SubjectBusiness.GetSubjectByUserGrade(userDb);
                foreach (var subject in subjects)
                {
                    var dto = new SignupSubjectsDto
                    {
                        SubjectName = subject.Name
                    };
                    var primary = await _manager.SignupBusiness.StudentBySubject(subject.Id.Value, Priority.Primary);
                    dto.PrimaryStudents = primary.Select(x => x.Email).ToList();
                    var secondary = await _manager.SignupBusiness.StudentBySubject(subject.Id.Value, Priority.Secondary);
                    dto.SecondaryStudents = secondary.Select(x => x.Email).ToList();

                    subject.SignedStudents = dto;
                }

                return subjects;
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}