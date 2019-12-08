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
    public class UserDbController : ControllerBase
    {
        private readonly MensaIntranetContext User_context;

        public UserDbController(MensaIntranetContext context)
        {
            User_context = context;
        }

        // GET: api/StudentDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDb>>> GetStudents()
        {
            return await User_context.Users.ToListAsync();
        }

        // GET: api/StudentDb/
        [HttpGet("{UserName}")]
        public bool HasUniqueUsername(string Username)
        {

            var TeacherDb = User_context.Users.FirstOrDefault(teacher => teacher.UserName == Username);

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
            var userDb = User_context.Users.FirstOrDefault(User => User.UserName == Username);

            if (userDb == null || userDb.IsDeleted )
            {
                return false;
            }
           
            byte[] bytes = Convert.FromBase64String(userDb.Password);
            byte[] salt = new byte[16];
            Array.Copy(bytes, 0, salt, 0, 16);
            var secretpass = new Rfc2898DeriveBytes(password, salt, 10000);
            Byte[] hash = secretpass.GetBytes(20);
            Byte[] hashbytes = new byte[36];
            Array.Copy(salt, 0, hashbytes, 0, 16);
            Array.Copy(hash, 0, hashbytes, 16, 20);
            var pass = Convert.ToBase64String(hashbytes);


            if (userDb.Password == pass)
                    return true;
            return result;
        }

        // GET: api/StudentDb/5
        [HttpGet("{ID}")]
        public async Task<ActionResult<UserDb>> GetStudentDb(int id)
        {


            var studentDb = await User_context.Users.FindAsync(id);

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
        public async Task<IActionResult> PutStudentDb(int id, UserDb userDb)
        {
            if (id != userDb.Id)
            {
                return BadRequest();
            }

            User_context.Entry(userDb).State = EntityState.Modified;

            try
            {
                await User_context.SaveChangesAsync();
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
        public async Task<ActionResult<UserDb>> PostUserDb(UserDb userDb)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var secretpassword = new Rfc2898DeriveBytes(userDb.Password, salt, 10000);
            byte[] hash = secretpassword.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            userDb.Password = Convert.ToBase64String(hashBytes);
            Console.WriteLine(salt);
           

            User_context.Users.Add(userDb);
            await User_context.SaveChangesAsync();

            return CreatedAtAction("GetUserDb", new { id = userDb.Id }, userDb);
        }
       


        // DELETE: api/StudentDb/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserDb>> DeleteUserDb(int id)
        {
            var studentDb = await User_context.Users.FindAsync(id);
            if (studentDb == null)
            {
                return NotFound();
            }

            User_context.Users.Remove(studentDb);
            await User_context.SaveChangesAsync();

            return studentDb;
        }

        private bool StudentDbExists(int id)
        {
            return User_context.Users.Any(e => e.Id == id);
        }
    }
}
