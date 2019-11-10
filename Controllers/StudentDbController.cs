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
    public class StudentDbController : ControllerBase
    {
        private readonly MensaIntranetContext _context;

        public StudentDbController(MensaIntranetContext context)
        {
            _context = context;
        }

        // GET: api/StudentDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDb>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        // GET: api/StudentDb/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDb>> GetStudentDb(int id)
        {
            var studentDb = await _context.Students.FindAsync(id);

            if (studentDb == null)
            {
                return NotFound();
            }

            return studentDb;
        }

        // PUT: api/StudentDb/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentDb(int id, StudentDb studentDb)
        {
            if (id != studentDb.Id)
            {
                return BadRequest();
            }

            _context.Entry(studentDb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentDbExists(id))
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

        // POST: api/StudentDb
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<StudentDb>> PostStudentDb(StudentDb studentDb)
        {
            _context.Students.Add(studentDb);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentDb", new { id = studentDb.Id }, studentDb);
        }

        // DELETE: api/StudentDb/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentDb>> DeleteStudentDb(int id)
        {
            var studentDb = await _context.Students.FindAsync(id);
            if (studentDb == null)
            {
                return NotFound();
            }

            _context.Students.Remove(studentDb);
            await _context.SaveChangesAsync();

            return studentDb;
        }

        private bool StudentDbExists(int id)
        {
            return _context.Students.Any(e => e.Id == id);
        }
    }
}
