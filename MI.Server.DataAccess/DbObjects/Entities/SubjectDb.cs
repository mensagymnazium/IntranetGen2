using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public class SubjectDb
    {
        public string Name { get; set; }
        public string SubjectId { get; set; }
        public string Description { get; set; }

        public TeacherDb Teacher { get; set; }

        public DayEnum DayPeriod { get; set; }
        public PeriodEnum PeriodPeriod { get; set; }

        

        public virtual GradesEnum ForClass { get; set; }
        public IList<StudentSubjectsDb> StudentSubjects { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
