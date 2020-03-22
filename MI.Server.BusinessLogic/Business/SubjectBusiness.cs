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
using Newtonsoft.Json;

namespace MI.Server.BusinessLogic.Business
{

    public class SubjectBusiness
    {
        private readonly MensaIntranetContext _context;

        internal SubjectBusiness(MensaIntranetContext context)
        {
            _context = context;
        }

        public static SubjectDto SubjectDbToSubjectDto(SubjectDb s)
        {
            return new SubjectDto()
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
                Capacity = s.Capacity,
                EnrolledStudents = s.UserSubjects.Count(),
                Period = s.Period,
                Type = s.Type.ToList(),
                Day = s.Day,
                Teacher = s.Teacher,
                Grades = s.GradeSubjects.Select(g => g.Grade).OrderBy(g => g).ToList()
            };
        }

        public async Task<IEnumerable<SubjectDto>> GetSubjects()
        {
            List<SubjectDb> subjects = await _context.Subjects
                .Include(s => s.GradeSubjects)
                .Include(s => s.UserSubjects)
                .ToListAsync();

            return subjects.Select(SubjectDbToSubjectDto);
        }

        public async Task<List<SubjectDto>> GetSubjectByUserClass(UserDb userDb)
        {
            List<SubjectDb> subjects = await _context.Subjects
                .Include(s => s.GradeSubjects)
                .Include(s => s.UserSubjects)
                .Where(s => s.GradeSubjects.Any(g => g.Grade == userDb.StudentClass))
                .ToListAsync();

            return subjects.Select(SubjectDbToSubjectDto).ToList();
        }


        public async Task CreateSubject(SubjectDto subject)
        {
            var subjectType = GetSubjectTypeEnum(subject.Type);
            SubjectDb subjectDb = new SubjectDb()
            {
                Name = subject.Name,
                Description = subject.Description,
                Capacity = subject.Capacity,
                Teacher = subject.Teacher,
                Type = subjectType,
                Day = subject.Day,
                Period = subject.Period,
                GradeSubjects = subject.Grades.Distinct().Select(g => new GradeSubjectsDb()
                {
                    Grade = g
                }).ToList()
            };

            _context.Subjects.Add(subjectDb);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSubject(int subjectId, SubjectDto subjectDto)
        {
            SubjectDb subjectDb = await _context.Subjects
                .Include(g => g.GradeSubjects)
                .FirstOrDefaultAsync(s => s.Id == subjectId);

            if (subjectDb == null)
            {
                throw new NotFoundException($"Subject with id {subjectId} does not exist in database.");
            }

            subjectDb.Name = subjectDto.Name ?? subjectDb.Name;
            subjectDb.Description = subjectDto.Description ?? subjectDb.Description;
            subjectDb.Capacity = subjectDto.Capacity ?? subjectDb.Capacity;
            subjectDb.Day = subjectDto.Day == DayEnum.NotDefined ? subjectDb.Day : subjectDto.Day;
            subjectDb.Period = subjectDto.Period == PeriodEnum.NotDefined ? subjectDb.Period : subjectDto.Period;
            subjectDb.Teacher = subjectDto.Teacher ?? subjectDb.Teacher;

            if (subjectDto.Type.Count != 0)
            {
                var subjectType = GetSubjectTypeEnum(subjectDto.Type);
                subjectDb.Type = subjectType;
            }

            if (subjectDto.Grades.Count != 0)
            {
                var oldGrades = subjectDb.GradeSubjects.Select(g => g.Grade).ToList();
                var newGrades = subjectDto.Grades;

                foreach (var grade in oldGrades.Except(newGrades))
                {
                    subjectDb.GradeSubjects.Remove(subjectDb.GradeSubjects.First(g => g.Grade == grade));
                }

                foreach (var grade in newGrades.Except(oldGrades))
                {
                    subjectDb.GradeSubjects.Add(new GradeSubjectsDb() { Grade = grade });
                }
            }

            _context.Subjects.Update(subjectDb);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSubject(int id)
        {
            var subject = await _context.Subjects
                .Include(s => s.GradeSubjects)
                .Include(s => s.UserSubjects)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subject == null)
            {
                throw new NotFoundException($"Subject with id {subject.Id} does not exist in database.");
            }

            _context.Subjects.Remove(subject);
            await _context.SaveChangesAsync();
        }

        private SubjectTypeEnum GetSubjectTypeEnum(List<SubjectTypeEnum> list)
        {
            if (list.Count == 0)
                return SubjectTypeEnum.NotDefined;
            return list.Aggregate((prev, next) => prev | next);
        }
    }
}
