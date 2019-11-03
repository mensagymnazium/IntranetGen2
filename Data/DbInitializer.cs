using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MI.Data
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
                new TeacherDb{UserName="cajaucitel", Password="123456"}
            };
            foreach (TeacherDb teacherDb in teachers)
            {
                context.Teachers.Add(teacherDb);
            }
            context.SaveChanges();

            var subjects = new SubjectDb[]
            {
                new SubjectDb{SubjectId="sarkasticky_predmet", Teacher=teachers[0], ForClass=GradesEnum.Prima|GradesEnum.Sekunda}
            };
            foreach (SubjectDb subjectDb in subjects)
            {
                context.Subjects.Add(subjectDb);
            }
            context.SaveChanges();

            var studentSubjects = new StudentSubjectsDb[]
            {
                new StudentSubjectsDb{Student=students[1], Subject=subjects[0]}
            };
            foreach (StudentSubjectsDb studentSubjectsDb in studentSubjects)
            {
                context.StudentSubjects.Add(studentSubjectsDb);
            }
            context.SaveChanges();
        }
    }
}
