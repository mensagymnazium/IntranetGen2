using MI.Server.DataAccess.DbObjects.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class SubjectDb : DbBase
    {
        public SubjectDb()
        {
            StudentSubjects = new List<StudentSubjectsDb>();
            GradeSubjects = new List<GradeSubjectsDb>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public int ClassCapacity { get; set; }
        public DayEnum DayPeriod { get; set; }
        public PeriodEnum TimePeriod { get; set; }
        public ICollection<UserSubjectsDb> UserSubjects { get; set; }
        public ICollection<GradeSubjectsDb> GradeSubjects { get; set; }
    }
}
