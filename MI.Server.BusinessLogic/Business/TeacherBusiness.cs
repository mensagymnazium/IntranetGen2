using MI.Server.BusinessLogic.DTO;
using MI.Server.BusinessLogic.Exceptions;
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
    public class TeacherBusiness
    {
        private readonly MensaIntranetContext _context;

        internal TeacherBusiness(MensaIntranetContext context)
        {
            _context = context;
        }

        public async Task<List<TeacherDTO>> GetTeachers()
        {
            List<UserDb> teachers = await _context.Users
                .Where(s => !s.IsDeleted)
                .Where(s => s.Role == UserType.Teacher)
                .ToListAsync();

            return teachers.Select(teacher => new TeacherDTO()
            {
                Id = teacher.Id,
                Name = teacher.FullName
            }).ToList();
        }
    }
}
