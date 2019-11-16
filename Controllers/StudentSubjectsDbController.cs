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
    public class StudentSubjectsDbController : ControllerBase
    {
        private readonly MensaIntranetContext StudentSubject_context;

        public StudentSubjectsDbController(MensaIntranetContext context)
        {
            StudentSubject_context = context;
        }

        // GET: api/StudentSubjectsDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentSubjectsDb>>> GetStudentSubjects()
        {
            return await StudentSubject_context.StudentSubjects.ToListAsync();
        }

        // GET: api/StudentSubjectsDb/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentSubjectsDb>> GetStudentSubjectsDb(int id)
        {
            var studentSubjectsDb = await StudentSubject_context.StudentSubjects.FindAsync(id);

            if (studentSubjectsDb == null)
            {
                return NotFound();
            }

            return studentSubjectsDb;
        }

        // PUT: api/StudentSubjectsDb/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentSubjectsDb(int id, StudentSubjectsDb studentSubjectsDb)
        {
            if (id != studentSubjectsDb.Id)
            {
                return BadRequest();
            }

            StudentSubject_context.Entry(studentSubjectsDb).State = EntityState.Modified;

            try
            {
                await StudentSubject_context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentSubjectsDbExists(id))
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

        // POST: api/StudentSubjectsDb
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<StudentSubjectsDb>> PostStudentSubjectsDb(StudentSubjectsDb studentSubjectsDb)
        {
            StudentSubject_context.StudentSubjects.Add(studentSubjectsDb);
            await StudentSubject_context.SaveChangesAsync();

            return CreatedAtAction("GetStudentSubjectsDb", new { id = studentSubjectsDb.Id }, studentSubjectsDb);
        }

        // DELETE: api/StudentSubjectsDb/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentSubjectsDb>> DeleteStudentSubjectsDb(int id)
        {
            var studentSubjectsDb = await StudentSubject_context.StudentSubjects.FindAsync(id);
            if (studentSubjectsDb == null)
            {
                return NotFound();
            }

            StudentSubject_context.StudentSubjects.Remove(studentSubjectsDb);
            await StudentSubject_context.SaveChangesAsync();

            return studentSubjectsDb;
        }

        private bool StudentSubjectsDbExists(int id)
        {
            return StudentSubject_context.StudentSubjects.Any(e => e.Id == id);
        }
    }
}
