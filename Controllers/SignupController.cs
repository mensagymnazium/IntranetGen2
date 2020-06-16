using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.DTO;
using MI.Server.DataAccess.DbObjects.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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

        [HttpGet]
        [Authorize(Roles = "Admin,Teacher")]
        public async Task<IEnumerable<SignupSubjectsDto>> GetStudentsBySubjects()
        {
            var subjects = await _manager.SubjectBusiness.GetSubjects();
            var result = new List<SignupSubjectsDto>();
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

                result.Add(dto);
            }
            return result;
        }
    }
}