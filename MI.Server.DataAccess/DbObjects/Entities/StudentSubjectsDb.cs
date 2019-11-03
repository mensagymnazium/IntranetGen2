using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class StudentSubjectsDb : DbBase
    {
        public StudentDb Student { get; set; }
        public SubjectDb Subject { get; set; }

    }
}
