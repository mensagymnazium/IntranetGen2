using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class UserDb : DbBase
    {
        public UserDb()
        {
            UserSubjects = new List<UserSubjectsDb>();
        }
        public string Email { get; set; }
        public GradeEnum StudentGrade { get; set; }
        public ProgrammingGroup Group { get; set; }
        public ICollection<UserSubjectsDb> UserSubjects { get; set; }
        public ICollection<SubmissionDb> Submissions { get; set; }
    }
}
