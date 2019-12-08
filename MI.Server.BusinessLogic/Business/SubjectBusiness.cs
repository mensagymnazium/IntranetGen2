using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
using MI.Server.DataAccess.DbObjects.Enums;
using MI.Server.BusinessLogic.DTO;
using MI.Server.BusinessLogic.Exceptions;

namespace MI.Server.BusinessLogic.Business
{

    public class SubjectBusiness
    {
        private readonly MensaIntranetContext _context;

        internal SubjectBusiness(MensaIntranetContext context)
        {
            _context = context;
        }

        public async Task<int> CountSubjects()
        {
            return await _context.Subjects.Where(a => !a.IsDeleted).CountAsync();
        }

        public static SubjectDTO SubjectDbToSubjectDTO(SubjectDb s)
        {
            return new SubjectDTO()
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
                Capacity = s.Capacity,
                Students = s?.UserSubjects?.Count(),
                Teacher = s.Teacher == null ? null : new TeacherDTO()
                {
                    Id = s.Teacher.Id,
                    Name = s.Teacher.FullName
                },
                Period = new PeriodDTO()
                {
                    Period = s.TimePeriod,
                    Day = s.DayPeriod
                },
                Grades = s.GradeSubjects.Select(g => g.Grade).OrderBy(g => g).ToList()
            };
        }

        public async Task<IEnumerable<SubjectDTO>> GetSubjects()
        {
            List<SubjectDb> subjects = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.Teacher)
                .Include(s => s.GradeSubjects)
                .Include(s => s.UserSubjects)
                .ToListAsync();

            return subjects.Select(SubjectDbToSubjectDTO);
        }

        public async Task<IEnumerable<SubjectDTO>> GetSubjectsByGrade(GradeEnum grade)
        {
            List<SubjectDb> subjects = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.Teacher)
                .Include(s => s.GradeSubjects)
                .Include(s => s.UserSubjects)
                .Where(s => s.GradeSubjects.Any(g => g.Grade == grade))
                .ToListAsync();

            return subjects.Select(SubjectDbToSubjectDTO);
        }

        public async Task<SubjectDTO> GetSubjectById(int id)
        {
            SubjectDb subject = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.Teacher)
                .Include(s => s.GradeSubjects)
                .FirstOrDefaultAsync(s => s.Id == id);

            return subject == null ? null : SubjectDbToSubjectDTO(subject);
        }

        private async Task<UserDb> FindTeacher(TeacherDTO teacher)
        {
            if (teacher?.Id != null)
            {
                UserDb teacherDb = await _context.Users
                .Where(t => !t.IsDeleted)
                .Where(t => t.Role == UserType.Teacher)
                .FirstOrDefaultAsync(t => t.Id == teacher.Id);

                return teacherDb ?? throw new NotFoundException($"Teacher with id {teacher.Id} does not exist in database.");
            }
            else
            {
                return null;
            }
        }

        public async Task<SubjectDTO> CreateSubject(SubjectDTO subject)
        {
            SubjectDb subjectDb = new SubjectDb()
            {
                Name = subject.Name,
                Description = subject.Description,
                Capacity = subject.Capacity,
                TimePeriod = subject.Period.Period,
                DayPeriod = subject.Period.Day,
                Teacher = await FindTeacher(subject.Teacher),
                GradeSubjects = subject.Grades.Distinct().Select(g => new GradeSubjectsDb()
                {
                    Grade = g
                }).ToList()
            };

            _context.Subjects.Add(subjectDb);
            await _context.SaveChangesAsync();

            return SubjectDbToSubjectDTO(subjectDb);
        }

        public async Task<SubjectDTO> UpdateSubject(SubjectDTO subject)
        {
            SubjectDb subjectDb = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.GradeSubjects)
                .FirstOrDefaultAsync(s => s.Id == subject.Id);

            if (subjectDb == null)
            {
                throw new NotFoundException($"Subject with id {subject.Id} does not exist in database.");
            }

            subjectDb.Name = subject.Name;
            subjectDb.Description = subject.Description;
            subjectDb.Capacity = subject.Capacity;
            subjectDb.TimePeriod = subject.Period.Period;
            subjectDb.DayPeriod = subject.Period.Day;
            subjectDb.Teacher = await FindTeacher(subject.Teacher);

            List<GradeEnum> oldGrades = subjectDb.GradeSubjects.Select(g => g.Grade).ToList();
            List<GradeEnum> newGrades = subject.Grades;

            foreach (GradeEnum grade in oldGrades.Except(newGrades))
            {
                subjectDb.GradeSubjects.Remove(subjectDb.GradeSubjects.First(g => g.Grade == grade));
            }

            foreach (GradeEnum grade in newGrades.Except(oldGrades))
            {
                subjectDb.GradeSubjects.Add(new GradeSubjectsDb() { Grade = grade });
            }

            _context.Subjects.Update(subjectDb);
            await _context.SaveChangesAsync();

            return SubjectDbToSubjectDTO(subjectDb);
        }

        public async Task<SubjectDTO> DeleteSubject(int id)
        {
            SubjectDb subject = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.GradeSubjects)
                .Include(s => s.UserSubjects)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subject == null)
            {
                throw new NotFoundException($"Subject with id {subject.Teacher.Id} does not exist in database.");
            }

            subject.IsDeleted = true;

            foreach (GradeSubjectsDb grade in subject.GradeSubjects)
            {
                grade.IsDeleted = true;
            }

            foreach (UserSubjectsDb us in subject.UserSubjects)
            {
                us.IsDeleted = true;
            }

            _context.Subjects.Update(subject);
            await _context.SaveChangesAsync();

            return SubjectDbToSubjectDTO(subject);
        }
    }
}
