using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public class StudentSubjectsDb
    {
        public int Id { get; set; }
        public StudentDb Student { get; set; }
        public SubjectDb Subject { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}
