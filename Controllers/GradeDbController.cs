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
    public class GradeDbController : ControllerBase
    {
        private readonly MensaIntranetContext _context;

        public GradeDbController(MensaIntranetContext context)
        {
            _context = context;
        }

        // GET: api/GradeDbs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GradeDb>>> GetGrades()
        {
            return await _context.Grades.ToListAsync();
        }

        // GET: api/GradeDbs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GradeDb>> GetGradeDb(int id)
        {
            var gradeDb = await _context.Grades.FindAsync(id);

            if (gradeDb == null)
            {
                return NotFound();
            }

            return gradeDb;
        }

        // PUT: api/GradeDbs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGradeDb(int id, GradeDb gradeDb)
        {
            if (id != gradeDb.Id)
            {
                return BadRequest();
            }

            _context.Entry(gradeDb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradeDbExists(id))
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

        // POST: api/GradeDbs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<GradeDb>> PostGradeDb(GradeDb gradeDb)
        {
            _context.Grades.Add(gradeDb);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGradeDb", new { id = gradeDb.Id }, gradeDb);
        }

        // DELETE: api/GradeDbs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GradeDb>> DeleteGradeDb(int id)
        {
            var gradeDb = await _context.Grades.FindAsync(id);
            if (gradeDb == null)
            {
                return NotFound();
            }

            _context.Grades.Remove(gradeDb);
            await _context.SaveChangesAsync();

            return gradeDb;
        }

        private bool GradeDbExists(int id)
        {
            return _context.Grades.Any(e => e.Id == id);
        }
    }
}
