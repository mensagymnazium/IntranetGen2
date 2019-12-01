using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class GradeSubjectsDb : DbBase
    {
        public GradeEnum Grade { get; set; }
        public int SubjectId { get; set; }
        public SubjectDb Subject { get; set; }
    }
}
