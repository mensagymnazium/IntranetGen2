using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.Business;
using MI.Server.BusinessLogic.DTO;
using MI.Server.BusinessLogic.Exceptions;
using MI.Server.DataAccess.DbObjects.Enums;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<IEnumerable<SubjectDTO>> Get()
        {
            return await _manager.SubjectBusiness.GetSubjects();
        }

        [HttpGet("grade/{grade}")]
        public async Task<IEnumerable<SubjectDTO>> GetByGrade(GradeEnum grade)
        {
            return await _manager.SubjectBusiness.GetSubjectsByGrade(grade);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SubjectDTO>> GetById(int id)
        {
            SubjectDTO subject = await _manager.SubjectBusiness.GetSubjectById(id);

            if (subject == null)
            {
                return NotFound();
            }

            return subject;
        }

        //[HttpPost]
        //public async Task<ActionResult<SubjectDTO>> Post([FromBody] SubjectDTO subject)
        //{
        //    try
        //    {
        //        SubjectDTO createdSubject = await _manager.SubjectBusiness.CreateSubject(subject);
        //        return CreatedAtAction("Get", new { id = createdSubject.Id }, createdSubject);
        //    }
        //    catch (NotFoundException e)
        //    {
        //        return NotFound(e.Message);
        //    }
        //}

        //[HttpPut("{id?}")]
        //public async Task<ActionResult<SubjectDTO>> PutById(int? id, [FromBody] SubjectDTO subject)
        //{
        //    subject.Id = id ?? subject.Id;

        //    try
        //    {
        //        return await _manager.SubjectBusiness.UpdateSubject(subject);
        //    }
        //    catch (NotFoundException e)
        //    {
        //        return NotFound(e.Message);
        //    }
        //}

        [HttpDelete("{id}")]
        public async Task<ActionResult<SubjectDTO>> DeleteById(int id)
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