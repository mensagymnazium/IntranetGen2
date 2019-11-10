using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class GradeDb : DbBase
    {
        public GradeEnum Grade { get; set; }
        public ICollection<GradeSubjectsDb> GradeSubjects { get; set; }
    }
}
