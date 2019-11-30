using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
using System.Security.Cryptography;

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

        // GET: api/StudentDb/
        [HttpGet("{UserName}")]
        public bool HasUniqueUsername(string Username)
        {

            var TeacherDb = Student_context.Teachers.FirstOrDefault(teacher => teacher.UserName == Username);

            if (TeacherDb == null)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        // GET: api/StudentDb/Koci/1234
        [HttpGet("{UserName}/{Password}")]
        public bool Authenticate(string Username, string password)
        {
            bool result = false;
            var studentDb = Student_context.Students.FirstOrDefault(student => student.UserName == Username);

            if (studentDb == null || studentDb.IsDeleted )
            {
                return false;
            }
           
            byte[] bytes = Convert.FromBase64String(studentDb.Password);
            byte[] salt = new byte[16];
            Array.Copy(bytes, 0, salt, 0, 16);
            var secretpass = new Rfc2898DeriveBytes(password, salt, 10000);
            Byte[] hash = secretpass.GetBytes(20);
            Byte[] hashbytes = new byte[36];
            Array.Copy(salt, 0, hashbytes, 0, 16);
            Array.Copy(hash, 0, hashbytes, 16, 20);
            var pass = Convert.ToBase64String(hashbytes);


            if (studentDb.Password == pass)
                    return true;
            return result;
        }

        // GET: api/StudentDb/5
        [HttpGet("{ID}")]
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

          

            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var secretpassword = new Rfc2898DeriveBytes(studentDb.Password, salt, 10000);
            byte[] hash = secretpassword.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            studentDb.Password = Convert.ToBase64String(hashBytes);
            Console.WriteLine(salt);
           

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
