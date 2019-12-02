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

        public SubjectDTO SubjectDbToSubjectDTO(SubjectDb s)
        {
            return new SubjectDTO()
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
                Capacity = s.Capacity,
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

        public async Task<IEnumerable<SubjectDTO>> ListSubjects()
        {
            List<SubjectDb> subjects = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.Teacher)
                .Include(s => s.GradeSubjects)
                .ToListAsync();

            return subjects.Select(SubjectDbToSubjectDTO);
        }

        public async Task<IEnumerable<SubjectDTO>> ListSubjectsByGrade(GradeEnum grade)
        {
            List<SubjectDb> subjects = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.Teacher)
                .Include(s => s.GradeSubjects)
                .Where(s => s.GradeSubjects.Any(g => g.Grade == grade))
                .ToListAsync();

            return subjects.Select(SubjectDbToSubjectDTO);
        }

        public async Task<SubjectDTO> GetSubject(int id)
        {
            SubjectDb subject = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.Teacher)
                .Include(s => s.GradeSubjects)
                .FirstOrDefaultAsync(s => s.Id == id);

            return subject == null ? null : SubjectDbToSubjectDTO(subject);
        }

        public async Task<SubjectDTO> CreateSubject(SubjectDTO subject)
        {
            TeacherDb teacher = await _context.Teachers
                .Where(t => !t.IsDeleted)
                .FirstOrDefaultAsync(t => t.Id == subject.Teacher.Id);

            if (teacher == null)
            {
                throw new NotFoundException($"Teacher with id {subject.Teacher.Id} does not exist in database.");
            }

            SubjectDb subjectDb = new SubjectDb()
            {
                Name = subject.Name,
                Description = subject.Description,
                Capacity = subject.Capacity,
                TimePeriod = subject.Period.Period,
                DayPeriod = subject.Period.Day,
                Teacher = teacher,
                GradeSubjects = subject.Grades.Select(g => new GradeSubjectsDb()
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

            TeacherDb teacher = await _context.Teachers
                .Where(t => !t.IsDeleted)
                .FirstOrDefaultAsync(t => t.Id == subject.Teacher.Id);

            if (teacher == null)
            {
                throw new NotFoundException($"Teacher with id {subject.Teacher.Id} does not exist in database.");
            }

            subjectDb.Name = subject.Name;
            subjectDb.Description = subject.Description;
            subjectDb.Capacity = subject.Capacity;
            subjectDb.TimePeriod = subject.Period.Period;
            subjectDb.DayPeriod = subject.Period.Day;
            subjectDb.Teacher = teacher;

            foreach (GradeSubjectsDb oldGrade in subjectDb.GradeSubjects.ToList())
            {
                if (!subject.Grades.Any(g => g == oldGrade.Grade))
                {
                    subjectDb.GradeSubjects.Remove(oldGrade);
                }
            }

            foreach (GradeEnum grade in subject.Grades)
            {
                if (!subjectDb.GradeSubjects.Any(g => g.Grade == grade))
                {
                    subjectDb.GradeSubjects.Add(new GradeSubjectsDb()
                    {
                        Grade = grade
                    });
                }
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
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subject == null)
            {
                throw new NotFoundException($"Subject with id {subject.Teacher.Id} does not exist in database.");
            }

            subject.IsDeleted = true;

            foreach (GradeSubjectsDb oldGrade in subject.GradeSubjects.ToList())
            {
                oldGrade.IsDeleted = true;
            }

            _context.Subjects.Update(subject);
            await _context.SaveChangesAsync();

            return SubjectDbToSubjectDTO(subject);
        }
    }
}
