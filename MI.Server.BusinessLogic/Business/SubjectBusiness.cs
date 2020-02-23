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

        public static SubjectDto SubjectDbToSubjectDTO(SubjectDb s)
        {
            return new SubjectDto()
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
                Capacity = s.Capacity,
                EnrolledStudents = s.UserSubjects.Count(),
                Period = DayPeriodEnumToString(s.TimePeriod),
                Day = s.DayPeriod.ToString(),
                Teacher = "Strejda" //Todo
            };
        }

        private static string DayPeriodEnumToString(PeriodEnum period)
        {
            switch (period)
            {
                case PeriodEnum.Period1_2:
                    return "1-2.";
                case PeriodEnum.Period3_4:
                    return "3-4.";
                case PeriodEnum.Period5_6:
                    return "5-6.";
                case PeriodEnum.Period7_8:
                    return "7-8";
                case PeriodEnum.Period9_10:
                    return "9-10";
                default:
                    return "----";
            }
        }

        public async Task<IEnumerable<SubjectDto>> GetSubjects()
        {
            List<SubjectDb> subjects = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.Teacher)
                .Include(s => s.GradeSubjects)
                .Include(s => s.UserSubjects)
                .ToListAsync();

            return subjects.Select(SubjectDbToSubjectDTO);
        }

        public async Task<IEnumerable<SubjectDto>> GetSubjectsByGrade(GradeEnum grade)
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

        public async Task<SubjectDto> GetSubjectById(int id)
        {
            SubjectDb subject = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.Teacher)
                .Include(s => s.GradeSubjects)
                .FirstOrDefaultAsync(s => s.Id == id);

            return subject == null ? null : SubjectDbToSubjectDTO(subject);
        }

        //private async Task<UserDb> FindTeacher(TeacherDTO teacher)
        //{
        //    if (teacher?.Id != null)
        //    {
        //        UserDb teacherDb = await _context.Users
        //        .Where(t => !t.IsDeleted)
        //        .Where(t => t.Role == UserType.Teacher)
        //        .FirstOrDefaultAsync(t => t.Id == teacher.Id);

        //        return teacherDb ?? throw new NotFoundException($"Teacher with id {teacher.Id} does not exist in database.");
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}

        //public async Task<SubjectDTO> CreateSubject(SubjectDTO subject)
        //{
        //    SubjectDb subjectDb = new SubjectDb()
        //    {
        //        Name = subject.Name,
        //        Description = subject.Description,
        //        Capacity = subject.Capacity,
        //        Teacher = await FindTeacher(subject.Teacher),
        //        GradeSubjects = subject.Grades.Distinct().Select(g => new GradeSubjectsDb()
        //        {
        //            Grade = g
        //        }).ToList()
        //    };

        //    _context.Subjects.Add(subjectDb);
        //    await _context.SaveChangesAsync();

        //    return SubjectDbToSubjectDTO(subjectDb);
        //}

        //public async Task<SubjectDTO> UpdateSubject(SubjectDTO subject)
        //{
        //    SubjectDb subjectDb = await _context.Subjects
        //        .Where(s => !s.IsDeleted)
        //        .Include(s => s.GradeSubjects)
        //        .FirstOrDefaultAsync(s => s.Id == subject.Id);

        //    if (subjectDb == null)
        //    {
        //        throw new NotFoundException($"Subject with id {subject.Id} does not exist in database.");
        //    }

        //    subjectDb.Name = subject.Name;
        //    subjectDb.Description = subject.Description;
        //    subjectDb.Capacity = subject.Capacity;
        //    //subjectDb.TeacherId = (await FindTeacher(subject.Teacher))?.Id; // Necessary for removal 

        //    List<GradeEnum> oldGrades = subjectDb.GradeSubjects.Select(g => g.Grade).ToList();
        //    //List<GradeEnum> newGrades = subject.Grades;

        //    foreach (GradeEnum grade in oldGrades.Except(newGrades))
        //    {
        //        subjectDb.GradeSubjects.Remove(subjectDb.GradeSubjects.First(g => g.Grade == grade));
        //    }

        //    foreach (GradeEnum grade in newGrades.Except(oldGrades))
        //    {
        //        subjectDb.GradeSubjects.Add(new GradeSubjectsDb() { Grade = grade });
        //    }

        //    _context.Subjects.Update(subjectDb);
        //    await _context.SaveChangesAsync();

        //    return SubjectDbToSubjectDTO(subjectDb);
        //}

        public async Task<SubjectDto> DeleteSubject(int id)
        {
            SubjectDb subject = await _context.Subjects
                .Where(s => !s.IsDeleted)
                .Include(s => s.GradeSubjects)
                .Include(s => s.UserSubjects)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subject == null)
            {
                throw new NotFoundException($"Subject with id {subject.Id} does not exist in database.");
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
