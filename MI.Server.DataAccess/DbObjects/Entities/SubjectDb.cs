using MI.Server.DataAccess.DbObjects.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class SubjectDb : DbBase
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public TeacherDb Teacher { get; set; }

        public DayEnum DayPeriod { get; set; }
        public PeriodEnum PeriodPeriod { get; set; }
        
        public ICollection<StudentSubjectsDb> StudentSubjects { get; set; }
        public GradeEnum Grades { get; set; }
    }
}
