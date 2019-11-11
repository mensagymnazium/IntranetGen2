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
        private readonly MensaIntranetContext Student_context;

        public StudentDbController(MensaIntranetContext context)
        {
            Student_context = context;
        }

        // GET: api/StudentDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDb>>> GetStudents()
        {
            return await Student_context.Students.ToListAsync();
        }

        // GET: api/StudentDb/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDb>> GetStudentDb(int id)
        {
            var studentDb = await Student_context.Students.FindAsync(id);

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

            Student_context.Entry(studentDb).State = EntityState.Modified;

            try
            {
                await Student_context.SaveChangesAsync();
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
            Student_context.Students.Add(studentDb);
            await Student_context.SaveChangesAsync();

            return CreatedAtAction("GetStudentDb", new { id = studentDb.Id }, studentDb);
        }

        // DELETE: api/StudentDb/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentDb>> DeleteStudentDb(int id)
        {
            var studentDb = await Student_context.Students.FindAsync(id);
            if (studentDb == null)
            {
                return NotFound();
            }

            Student_context.Students.Remove(studentDb);
            await Student_context.SaveChangesAsync();

            return studentDb;
        }

        private bool StudentDbExists(int id)
        {
            return Student_context.Students.Any(e => e.Id == id);
        }
    }
}
