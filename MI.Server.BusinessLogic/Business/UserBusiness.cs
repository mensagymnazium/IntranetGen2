using MI.Server.BusinessLogic.DTO;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
using MI.Server.DataAccess.DbObjects.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MI.Server.BusinessLogic.Business
{
    public class UserBusiness
    {
        private readonly MensaIntranetContext _context;

        internal UserBusiness(MensaIntranetContext context)
        {
            _context = context;
        }

        public static UserDto UserDbToUserDto(UserDb u)
        {
            return new UserDto()
            {
                Id = u.Id,
                Email = u.Email,
                StudentClass = u.StudentGrade,
                SignDone = false
            };
        }

        public async Task<UserDb> GetUserDbByMail(string mail)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == mail);
        }

        public async Task InsertOrUpdateUserDb(UserDto userDto)
        {
            var userDb = new UserDb()
            {
                Email = userDto.Email,
                StudentGrade = userDto.StudentClass
            };

            var userInDb = _context.Users.SingleOrDefault(x => x.Email == userDb.Email);
            if(userInDb == null)
            {
                _context.Users.Add(userDb);
            }
            else
            {
                userInDb.StudentGrade = userDb.StudentGrade;
                _context.Users.Update(userInDb);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<List<UserDto>> GetStudents()
        {
            var students = await _context.Users.Include(x => x.UserSubjects).Where(s => s.StudentGrade != GradeEnum.NotDefined && s.StudentGrade != GradeEnum.Teacher && s.StudentGrade != GradeEnum.Admin).ToListAsync();

            return students.Select(UserDbToUserDto).ToList();
        }
    }
}
