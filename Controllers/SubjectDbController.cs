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
    public class SubjectDbController : ControllerBase
    {
        private readonly MensaIntranetContext _context;

        public SubjectDbController(MensaIntranetContext context)
        {
            _context = context;
        }

        // GET: api/SubjectDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubjectDb>>> GetSubjects()
        {
            return await _context.Subjects.ToListAsync();
        }

        // GET: api/SubjectDb/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubjectDb>> GetSubjectDb(int id)
        {
            var subjectDb = await _context.Subjects.FindAsync(id);

            if (subjectDb == null)
            {
                return NotFound();
            }

            return subjectDb;
        }

        // PUT: api/SubjectDb/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubjectDb(int id, SubjectDb subjectDb)
        {
            if (id != subjectDb.Id)
            {
                return BadRequest();
            }

            _context.Entry(subjectDb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubjectDbExists(id))
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

        // POST: api/SubjectDb
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<SubjectDb>> PostSubjectDb(SubjectDb subjectDb)
        {
            _context.Subjects.Add(subjectDb);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubjectDb", new { id = subjectDb.Id }, subjectDb);
        }

        // DELETE: api/SubjectDb/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SubjectDb>> DeleteSubjectDb(int id)
        {
            var subjectDb = await _context.Subjects.FindAsync(id);
            if (subjectDb == null)
            {
                return NotFound();
            }

            _context.Subjects.Remove(subjectDb);
            await _context.SaveChangesAsync();

            return subjectDb;
        }

        private bool SubjectDbExists(int id)
        {
            return _context.Subjects.Any(e => e.Id == id);
        }
    }
}
