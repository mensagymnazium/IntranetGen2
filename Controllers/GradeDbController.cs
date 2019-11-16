﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;


//https://www.tutorialsteacher.com/webapi/web-api-controller tutorial
namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeDbController : ControllerBase
    {
        private readonly MensaIntranetContext Grade_context; //creates local context

        public GradeDbController(MensaIntranetContext context)  //pulls context from Mensainternetcontext
        {
            Grade_context = context; //assigns values of MensaInternetContext to local context
        }

        // GET: api/Gradedb
        //gets all elements from table. Format is api/Gradedb
        //All the methods are asynchronous: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/index
        //returns a list of grades using IEnumarable, which is used for iterating over elements in a list (?)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GradeDb>>> GetGrades()
        {
            return await Grade_context.Grades.ToListAsync();
        }

        // GET: api/Gradedbs/5
        //gets a single element by ID.Format: api/Gradedb/*id*
        [HttpGet("{id}")]
        public async Task<ActionResult<GradeDb>> GetGradeDb(int id)
        {
            var gradeDb = await Grade_context.Grades.FindAsync(id);

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

            Grade_context.Entry(gradeDb).State = EntityState.Modified;

            try
            {
                await Grade_context.SaveChangesAsync();
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
            Grade_context.Grades.Add(gradeDb);
            await Grade_context.SaveChangesAsync();

            return CreatedAtAction("GetGradeDb", new { id = gradeDb.Id }, gradeDb);
        }

        // DELETE: api/GradeDbs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GradeDb>> DeleteGradeDb(int id)
        {
            var gradeDb = await Grade_context.Grades.FindAsync(id);
            if (gradeDb == null)
            {
                return NotFound();
            }

            Grade_context.Grades.Remove(gradeDb);
            await Grade_context.SaveChangesAsync();

            return gradeDb;
        }

        private bool GradeDbExists(int id)
        {
            return Grade_context.Grades.Any(e => e.Id == id);
        }
    }
}