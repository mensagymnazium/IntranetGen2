using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class GradeSubjectsDb : DbBase
    {
        public int GradeId { get; set; }
        public GradeDb Grade { get; set; }
        public int SubjectId { get; set; }
        public SubjectDb Subject { get; set; }
    }
}
