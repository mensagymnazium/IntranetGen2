using MI.Server.BusinessLogic.DTO;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
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

        public async Task<UserDb> GetUserDbByMail(string mail)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == mail && !x.IsDeleted);
        }

        public async Task InsertOrUpdateUserDb(UserDto userDto)
        {
            var userDb = new UserDb()
            {
                Email = userDto.Email,
                StudentClass = userDto.StudentClass
            };

            var userInDb = _context.Users.SingleOrDefault(x => x.Email == userDb.Email);
            if(userInDb == null)
            {
                _context.Users.Add(userDb);
            }
            else
            {
                userInDb.StudentClass = userDb.StudentClass;
                _context.Users.Update(userInDb);
            }
            await _context.SaveChangesAsync();
        }
    }
}
