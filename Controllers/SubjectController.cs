using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.Business;
using MI.Server.BusinessLogic.DTO;
using MI.Server.BusinessLogic.Exceptions;
using MI.Server.DataAccess.DbObjects.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly BusinessManager _manager;
        public SubjectController(BusinessManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public async Task<IEnumerable<SubjectDTO>> Get([FromQuery] GradeEnum? grade)
        {
            if (grade != null)
            {
                return await _manager.SubjectBusiness.ListSubjectsByGrade((GradeEnum)grade);
            }

            return await _manager.SubjectBusiness.ListSubjects();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SubjectDTO>> Get(int id)
        {
            SubjectDTO subject = await _manager.SubjectBusiness.GetSubject(id);

            if (subject == null)
            {
                return NotFound();
            }

            return subject;
        }

        [HttpPost]
        public async Task<ActionResult<SubjectDTO>> Post([FromBody] SubjectDTO subject)
        {
            try
            {
                SubjectDTO createdSubject = await _manager.SubjectBusiness.CreateSubject(subject);
                return CreatedAtAction("Get", new { id = createdSubject.Id }, createdSubject);
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("{id?}")]
        public async Task<ActionResult<SubjectDTO>> Put(int? id, [FromBody] SubjectDTO subject)
        {
            subject.Id = id ?? subject.Id;

            try
            {
                return await _manager.SubjectBusiness.UpdateSubject(subject);
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<SubjectDTO>> Delete(int id)
        {
            try
            {
                return await _manager.SubjectBusiness.DeleteSubject(id);
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}