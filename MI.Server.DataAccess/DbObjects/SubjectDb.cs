using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public class SubjectDb : DbBase
    {
        public enum DayEnum
        {
            Monday = 10,
            Tuesday = 20,
            Wednesday = 30,
            Thursday = 40,
            Friday = 50,
            Saturday = 60,
            Sunday = 70
        }
        public enum PeriodEnum
        {
            Period1_2=10,
            Period3_4=20,
            Period5_6=30,
            Period7_8=40,
            Period9_10=50
        }
        public bool Draft { get; set; }
        public string Name { get; set; }
        public string SubjectId { get; set; }
        public string Description { get; set; }

        public TeacherDb Teacher { get; set; }

        public DayEnum DayPeriod { get; set; }
        public PeriodEnum PeriodPeriod { get; set; }

        public enum Grades
        {
            Prima   = (1 << 0),
            Sekunda = (1 << 1),
            Tercie  = (1 << 2),
            Kvarta  = (1 << 3),
            Kvinta  = (1 << 4),
            Sexta   = (1 << 5),
            Septima = (1 << 6),
            Oktava  = (1 << 7)
        }

        public virtual Grades ForClass { get; set; }
        public IList<EnrollementDb> Enrollements { get; set; }
    }
}
