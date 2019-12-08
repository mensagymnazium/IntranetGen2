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
    public class UserSubjectsDbController : ControllerBase
    {
        private readonly MensaIntranetContext StudentSubject_context;

        public UserSubjectsDbController(MensaIntranetContext context)
        {
            StudentSubject_context = context;
        }

        // GET: api/UserSubjectsDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserSubjectsDb>>> GetUserSubjects()
        {
            return await StudentSubject_context.UserSubjects.ToListAsync();
        }

        // GET: api/UserSubjectsDb/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserSubjectsDb>> GetUserSubjectsDb(int id)
        {
            var UserSubjectsDb = await StudentSubject_context.UserSubjects.FindAsync(id);

            if (UserSubjectsDb == null)
            {
                return NotFound();
            }

            return UserSubjectsDb;
        }

        // PUT: api/UserSubjectsDb/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserSubjectsDb(int id, UserSubjectsDb UserSubjectsDb)
        {
            if (id != UserSubjectsDb.Id)
            {
                return BadRequest();
            }

            StudentSubject_context.Entry(UserSubjectsDb).State = EntityState.Modified;

            try
            {
                await StudentSubject_context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserSubjectsDbExists(id))
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

        // POST: api/UserSubjectsDb
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UserSubjectsDb>> PostUserSubjectsDb(UserSubjectsDb UserSubjectsDb)
        {
            StudentSubject_context.UserSubjects.Add(UserSubjectsDb);
            await StudentSubject_context.SaveChangesAsync();

            return CreatedAtAction("GetUserSubjectsDb", new { id = UserSubjectsDb.Id }, UserSubjectsDb);
        }

        // DELETE: api/UserSubjectsDb/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserSubjectsDb>> DeleteUserSubjectsDb(int id)
        {
            var UserSubjectsDb = await StudentSubject_context.UserSubjects.FindAsync(id);
            if (UserSubjectsDb == null)
            {
                return NotFound();
            }

            StudentSubject_context.UserSubjects.Remove(UserSubjectsDb);
            await StudentSubject_context.SaveChangesAsync();

            return UserSubjectsDb;
        }

        private bool UserSubjectsDbExists(int id)
        {
            return StudentSubject_context.UserSubjects.Any(e => e.Id == id);
        }
    }
}
