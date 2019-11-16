using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherDbController : ControllerBase
    {
        private readonly MensaIntranetContext Teacher_context;

        public TeacherDbController(MensaIntranetContext context)
        {
            Teacher_context = context;
        }

        // GET: api/TeacherDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherDb>>> GetTeachers()
        {
            return await Teacher_context.Teachers.ToListAsync();
        }

        // GET: api/TeacherDb/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherDb>> GetTeacherDb(int id)
        {
            var teacherDb = await Teacher_context.Teachers.FindAsync(id);

            if (teacherDb == null)
            {
                return NotFound();
            }

            return teacherDb;
        }

        // PUT: api/TeacherDb/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacherDb(int id, TeacherDb teacherDb)
        {
            if (id != teacherDb.Id)
            {
                return BadRequest();
            }

            Teacher_context.Entry(teacherDb).State = EntityState.Modified;

            try
            {
                await Teacher_context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherDbExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TeacherDb
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TeacherDb>> PostTeacherDb(TeacherDb teacherDb)
        {
            Teacher_context.Teachers.Add(teacherDb);
            await Teacher_context.SaveChangesAsync();

            return CreatedAtAction("GetTeacherDb", new { id = teacherDb.Id }, teacherDb);
        }

        // DELETE: api/TeacherDb/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TeacherDb>> DeleteTeacherDb(int id)
        {
            var teacherDb = await Teacher_context.Teachers.FindAsync(id);
            if (teacherDb == null)
            {
                return NotFound();
            }

            Teacher_context.Teachers.Remove(teacherDb);
            await Teacher_context.SaveChangesAsync();

            return teacherDb;
        }

        private bool TeacherDbExists(int id)
        {
            return Teacher_context.Teachers.Any(e => e.Id == id);
        }
    }
}
