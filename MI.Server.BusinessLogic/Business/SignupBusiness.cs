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

        public async Task<List<SubjectDTO>> SubjectsByStudent(int id)
        {
            UserDb student = await _context.Users
                .Where(s => !s.IsDeleted)
                .Where(s => s.Role == UserType.Student)
                .Include(s => s.UserSubjects).ThenInclude(us => us.Subject).ThenInclude(s => s.GradeSubjects)
                .Include(s => s.UserSubjects).ThenInclude(us => us.Subject).ThenInclude(s => s.UserSubjects)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
            {
                throw new NotFoundException($"Student with id {id} does not exist in database.");
            }

            return student.UserSubjects
                .Where(us => !us.IsDeleted)
                .Select(us => us.Subject)
                .Select(s => SubjectBusiness.SubjectDbToSubjectDTO(s))
                .ToList();
        }

        public async Task<List<StudentDTO>> StudentBySubject(int id)
        {
            SubjectDb subject = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.UserSubjects).ThenInclude(us => us.User)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subject == null)
            {
                throw new NotFoundException($"Subject with id {id} does not exist in database.");
            }

            return subject.UserSubjects
                .Where(us => !us.IsDeleted)
                .Select(us => us.User)
                .Select(u => new StudentDTO()
                {
                    Name = u.FullName,
                    Id = u.Id,
                    Grade = u.StudentClass
                })
                .ToList();
        }

        public async Task CreateSignup(int studentId, int subjectId)
        {
            UserDb student = await _context.Users
                .Where(s => !s.IsDeleted)
                .Where(s => s.Role == UserType.Student)
                .FirstOrDefaultAsync(s => s.Id == studentId);

            SubjectDb subject = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .FirstOrDefaultAsync(s => s.Id == subjectId);

            _context.UserSubjects.Add(new UserSubjectsDb()
            {
                User = student ?? throw new NotFoundException($"Student with id {studentId} does not exist in database."),
                Subject = subject ?? throw new NotFoundException($"Subject with id {subjectId} does not exist in database.")
            });

            await _context.SaveChangesAsync();
        }

        public async Task DeleteSignup(int studentId, int subjectId)
        {
            UserSubjectsDb signup = await _context.UserSubjects
                .Where(us => !us.IsDeleted)
                .FirstOrDefaultAsync(us => us.SubjectId == subjectId && us.UserId == studentId);

            if (signup == null)
            {
                throw new NotFoundException($"A student with id {studentId} hasn't signed up for a subject with id {subjectId}.");
            }
            _context.UserSubjects.Remove(signup);

            await _context.SaveChangesAsync();
        }
    }
}
