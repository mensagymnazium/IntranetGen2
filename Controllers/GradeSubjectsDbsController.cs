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
    public class GradeSubjectsDbsController : ControllerBase
    {
        private readonly MensaIntranetContext _context;

        public GradeSubjectsDbsController(MensaIntranetContext context)
        {
            _context = context;
        }

        // GET: api/GradeSubjectsDbs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GradeSubjectsDb>>> GetGradeSubjects()
        {
            return await _context.GradeSubjects.ToListAsync();
        }

        // GET: api/GradeSubjectsDbs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GradeSubjectsDb>> GetGradeSubjectsDb(int id)
        {
            var gradeSubjectsDb = await _context.GradeSubjects.FindAsync(id);

            if (gradeSubjectsDb == null)
            {
                return NotFound();
            }

            return gradeSubjectsDb;
        }

        // PUT: api/GradeSubjectsDbs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGradeSubjectsDb(int id, GradeSubjectsDb gradeSubjectsDb)
        {
            if (id != gradeSubjectsDb.Id)
            {
                return BadRequest();
            }

            _context.Entry(gradeSubjectsDb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradeSubjectsDbExists(id))
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

        // POST: api/GradeSubjectsDbs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<GradeSubjectsDb>> PostGradeSubjectsDb(GradeSubjectsDb gradeSubjectsDb)
        {
            _context.GradeSubjects.Add(gradeSubjectsDb);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGradeSubjectsDb", new { id = gradeSubjectsDb.Id }, gradeSubjectsDb);
        }

        // DELETE: api/GradeSubjectsDbs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GradeSubjectsDb>> DeleteGradeSubjectsDb(int id)
        {
            var gradeSubjectsDb = await _context.GradeSubjects.FindAsync(id);
            if (gradeSubjectsDb == null)
            {
                return NotFound();
            }

            _context.GradeSubjects.Remove(gradeSubjectsDb);
            await _context.SaveChangesAsync();

            return gradeSubjectsDb;
        }

        private bool GradeSubjectsDbExists(int id)
        {
            return _context.GradeSubjects.Any(e => e.Id == id);
        }
    }
}
