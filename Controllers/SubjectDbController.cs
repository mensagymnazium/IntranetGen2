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
        private readonly MensaIntranetContext Subject_context;

        public SubjectDbController(MensaIntranetContext context)
        {
            Subject_context = context;
        }

        // GET: api/SubjectDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubjectDb>>> GetSubjects()
        {
            return await Subject_context.Subjects.ToListAsync();
        }

        // GET: api/SubjectDb/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubjectDb>> GetSubjectDb(int id)
        {
            var subjectDb = await Subject_context.Subjects.FindAsync(id);

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

            Subject_context.Entry(subjectDb).State = EntityState.Modified;

            try
            {
                await Subject_context.SaveChangesAsync();
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

          
                

            Subject_context.Subjects.Add(subjectDb);
            await Subject_context.SaveChangesAsync();

            return CreatedAtAction("GetSubjectDb", new { id = subjectDb.Id }, subjectDb);
        }

        // DELETE: api/SubjectDb/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SubjectDb>> DeleteSubjectDb(int id)
        {
            var subjectDb = await Subject_context.Subjects.FindAsync(id);
            if (subjectDb == null)
            {
                return NotFound();
            }

            Subject_context.Subjects.Remove(subjectDb);
            await Subject_context.SaveChangesAsync();

            return subjectDb;
        }

        private bool SubjectDbExists(int id)
        {
            return Subject_context.Subjects.Any(e => e.Id == id);
        }
    }
}
