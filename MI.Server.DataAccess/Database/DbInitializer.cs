using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
using MI.Server.DataAccess.DbObjects.Enums;
using System.Linq;

namespace MI.Data.DataAccess.Database
{
    public static class DbInitializer
    {
        public static void Initialize(MensaIntranetContext context)
        {
            context.Database.EnsureCreated();
            if (context.Students.Any())
            {
                return;
            }

            var students = new StudentDb[]
            {
                new StudentDb{UserName="caja", Password="123456"},
                new StudentDb{UserName="michal", Password="atlas"},
                new StudentDb{UserName="petr_dedek", Password="no_help"}
            };
            foreach(StudentDb studentDb in students)
            {
                context.Students.Add(studentDb);
            }
            context.SaveChanges();

            var teachers = new TeacherDb[]
            {
                new TeacherDb{UserName="cajaucitel", Password="123456"},
                new TeacherDb{UserName="stec", Password="asdf456"}
            };
            foreach (TeacherDb teacherDb in teachers)
            {
                context.Teachers.Add(teacherDb);
            }
            context.SaveChanges();

            var subjects = new SubjectDb[]
            {
                new SubjectDb{Teacher=teachers[0], Name="IM",           Grades=GradeEnum.Prima|GradeEnum.Sekunda, DayPeriod=DayEnum.Monday, PeriodPeriod=PeriodEnum.Period1_2, Description="Random Description"},
                new SubjectDb{Teacher=teachers[0], Name="Experiment",   Grades=GradeEnum.Prima|GradeEnum.Sekunda, DayPeriod=DayEnum.Monday, PeriodPeriod=PeriodEnum.Period3_4},
                new SubjectDb{Teacher=teachers[0], Name="OnlyTheory",   Grades=GradeEnum.Septima|GradeEnum.Oktava, DayPeriod=DayEnum.Tuesday, PeriodPeriod=PeriodEnum.Period5_6}
            };
            foreach (SubjectDb subjectDb in subjects)
            {
                context.Subjects.Add(subjectDb);
            }
            context.SaveChanges();

            var studentSubjects = new StudentSubjectsDb[]
            {
                new StudentSubjectsDb{Student=students[1], Subject=subjects[0]},
                new StudentSubjectsDb{Student=students[1], Subject=subjects[2]},
                new StudentSubjectsDb{Student=students[1], Subject=subjects[1]}
            };
            foreach (StudentSubjectsDb studentSubjectsDb in studentSubjects)
            {
                context.StudentSubjects.Add(studentSubjectsDb);
            }
            context.SaveChanges();
        }
    }
}
