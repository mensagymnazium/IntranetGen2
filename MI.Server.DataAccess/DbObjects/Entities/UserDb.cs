using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class UserDb : DbBase
    {
        public string Email { get; set; }
        public GradeEnum StudentClass { get; set; }
        public ICollection<UserSubjectsDb> UserSubjects { get; set; }
    }
}
