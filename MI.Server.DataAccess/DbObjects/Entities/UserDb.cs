using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class UserDb : DbBase
    {
        public UserType Role { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }
        public GradeEnum StudentClass { get; set; }
        public ICollection<UserSubjectsDb> UserSubjects { get; set; }
        public ICollection<SubjectDb> TaughtSubjects { get; set; }
    }
}
