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
    public class SignupBusiness
    {
        private readonly MensaIntranetContext _context;

        internal SignupBusiness(MensaIntranetContext context)
        {
            _context = context;
        }

        public async Task<List<SubjectDto>> SubjectsByStudent(int id)
        {
            UserDb student = await _context.Users
                .Include(s => s.UserSubjects).ThenInclude(us => us.Subject).ThenInclude(s => s.GradeSubjects)
                .Include(s => s.UserSubjects).ThenInclude(us => us.Subject).ThenInclude(s => s.UserSubjects)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
            {
                throw new NotFoundException($"Student with id {id} does not exist in database.");
            }

            return student.UserSubjects
                .Select(us => us.Subject)
                .Select(s => SubjectBusiness.SubjectDbToSubjectDto(s))
                .ToList();
        }

        public async Task<List<UserDto>> StudentBySubject(int id)
        {
            SubjectDb subject = await _context.Subjects
                .Include(s => s.UserSubjects).ThenInclude(us => us.User)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subject == null)
            {
                throw new NotFoundException($"Subject with id {id} does not exist in database.");
            }

            return subject.UserSubjects
                .Select(us => us.User)
                .Select(u => new UserDto()
                {
                    Email = u.Email,
                    Id = u.Id,
                    StudentClass = u.StudentClass
                })
                .ToList();
        }

        public async Task CreateSignup(UserDb student, int subjectId)
        {
            if (student == null)
                throw new ArgumentNullException();

            var existingSignup = await _context.UserSubjects
                .FirstOrDefaultAsync(us => us.SubjectId == subjectId && us.UserId == student.Id);

            if (existingSignup != null)
            {
                throw new NotFoundException($"Student with id {student.Id} has already signed up for the subject with id {subjectId}.");
            }

            var subject = await _context.Subjects
                .FirstOrDefaultAsync(s => s.Id == subjectId);

            _context.UserSubjects.Add(new UserSubjectsDb()
            {
                User = student ?? throw new NotFoundException($"Student with id {student.Id} does not exist in database."),
                Subject = subject ?? throw new NotFoundException($"Subject with id {subjectId} does not exist in database.")
            });

            await _context.SaveChangesAsync();
        }

        public async Task DeleteSignup(UserDb student, int subjectId)
        {
            if (student == null)
                throw new ArgumentNullException();

            UserSubjectsDb signup = await _context.UserSubjects
                .FirstOrDefaultAsync(us => us.SubjectId == subjectId && us.UserId == student.Id);

            if (signup == null)
            {
                throw new NotFoundException($"A student with id {student.Id} hasn't signed up for a subject with id {subjectId}.");
            }
            _context.UserSubjects.Remove(signup);

            await _context.SaveChangesAsync();
        }
    }
}
