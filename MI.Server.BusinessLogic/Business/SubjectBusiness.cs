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
using MI.Server.BusinessLogic.Helpers;

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
                Category = s.Category.ToList(),
                Type = s.Types.ToList(),
                Day = s.Day,
                Teacher = s.Teacher,
                Grades = s.Grades.ToList()
            };
        }

        public async Task<IEnumerable<SubjectDto>> GetSubjects()
        {
            List<SubjectDb> subjects = await _context.Subjects
                .Include(s => s.UserSubjects)
                .ToListAsync();

            return subjects.Select(SubjectDbToSubjectDto);
        }

        public async Task<SubjectDto> GetSubjectById(int id)
        {
            var subject = await _context.Subjects
                .Include(s => s.UserSubjects)
                .Where(s => s.Id == id)
                .FirstOrDefaultAsync();

            return SubjectDbToSubjectDto(subject);
        }

        public async Task<List<SubjectDto>> GetSubjectByUserGrade(UserDb userDb)
        {
            List<SubjectDb> subjects = await _context.Subjects
                .Include(s => s.UserSubjects)
                .ToListAsync();

            if(userDb.StudentGrade == GradeEnum.Admin || userDb.StudentGrade == GradeEnum.Teacher)
                return subjects.Select(SubjectDbToSubjectDto).ToList();

            var selected = subjects.Where(s => s.Grades.ToList().Contains(userDb.StudentGrade));

            return selected.Select(SubjectDbToSubjectDto).ToList();
        }

        public async Task CreateSubject(SubjectDto subject)
        {
            var subjectType = EnumHelper.GetSubjectTypeEnum(subject.Type);
            var grades = EnumHelper.GetGradeEnum(subject.Grades);
            var category = EnumHelper.GetCategoryEnum(subject.Category);

            SubjectDb subjectDb = new SubjectDb()
            {
                Name = subject.Name,
                Description = subject.Description,
                Capacity = subject.Capacity,
                Teacher = subject.Teacher,
                Category = category,
                Types = subjectType,
                Day = subject.Day,
                Period = subject.Period,
                Grades = grades
            };

            _context.Subjects.Add(subjectDb);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSubject(int subjectId, SubjectDto subjectDto)
        {
            SubjectDb subjectDb = await _context.Subjects
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
                var subjectType = EnumHelper.GetSubjectTypeEnum(subjectDto.Type);
                subjectDb.Types = subjectType;
            }
            if (subjectDto.Category.Count != 0)
            {
                var subjectCategory = EnumHelper.GetCategoryEnum(subjectDto.Category);
                subjectDb.Category = subjectCategory;
            }
            if (subjectDto.Grades.Count != 0)
            {
                var grades = EnumHelper.GetGradeEnum(subjectDto.Grades);
                subjectDb.Grades = grades;
            }

            _context.Subjects.Update(subjectDb);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSubject(int id)
        {
            var subject = await _context.Subjects
                .Include(s => s.UserSubjects)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subject == null)
            {
                throw new NotFoundException($"Subject with id {subject.Id} does not exist in database.");
            }

            _context.Subjects.Remove(subject);
            await _context.SaveChangesAsync();
        }
    }
}
