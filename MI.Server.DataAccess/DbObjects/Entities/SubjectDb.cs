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
            UserSubjects = new List<UserSubjectsDb>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public int? Capacity { get; set; }
        public DayEnum Day { get; set; }
        public PeriodEnum Period{ get; set; }
        public string Teacher { get; set; }
        public SubjectCategoryEnum Category { get; set; }
        public SubjectTypeEnum Types { get; set; }
        public GradeEnum Grades { get; set; }
        public ICollection<UserSubjectsDb> UserSubjects { get; set; }
    }
}
