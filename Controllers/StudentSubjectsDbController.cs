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
        private readonly MensaIntranetContext _context;

        public StudentSubjectsDbController(MensaIntranetContext context)
        {
            _context = context;
        }

        // GET: api/StudentSubjectsDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentSubjectsDb>>> GetStudentSubjects()
        {
            return await _context.StudentSubjects.ToListAsync();
        }

        // GET: api/StudentSubjectsDb/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentSubjectsDb>> GetStudentSubjectsDb(int id)
        {
            var studentSubjectsDb = await _context.StudentSubjects.FindAsync(id);

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

            _context.Entry(studentSubjectsDb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
            _context.StudentSubjects.Add(studentSubjectsDb);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentSubjectsDb", new { id = studentSubjectsDb.Id }, studentSubjectsDb);
        }

        // DELETE: api/StudentSubjectsDb/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentSubjectsDb>> DeleteStudentSubjectsDb(int id)
        {
            var studentSubjectsDb = await _context.StudentSubjects.FindAsync(id);
            if (studentSubjectsDb == null)
            {
                return NotFound();
            }

            _context.StudentSubjects.Remove(studentSubjectsDb);
            await _context.SaveChangesAsync();

            return studentSubjectsDb;
        }

        private bool StudentSubjectsDbExists(int id)
        {
            return _context.StudentSubjects.Any(e => e.Id == id);
        }
    }
}
