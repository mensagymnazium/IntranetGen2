using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.Business;
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
    public class SubjectController : ControllerBase
    {
        private readonly BusinessManager _manager;
        public SubjectController(BusinessManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<SubjectDto>> Get()
        {
            return await _manager.SubjectBusiness.GetSubjects();
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post(SubjectDto subject)
        {
            try
            {
                await _manager.SubjectBusiness.CreateSubject(subject);
                return Ok();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("{subjectId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put([FromRoute]int subjectId, SubjectDto subjectDto)
        {
            try
            {
                await _manager.SubjectBusiness.UpdateSubject(subjectId, subjectDto);
                return Ok();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("{subjectId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute]int subjectId)
        {
            try
            {
                await _manager.SubjectBusiness.DeleteSubject(subjectId);
                return Ok();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}