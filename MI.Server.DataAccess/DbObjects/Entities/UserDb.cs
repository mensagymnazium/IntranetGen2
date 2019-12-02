using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public abstract class UserDb : DbBase
    {
        public string UserName { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Mail { get; set; }

        public string Password { get; set; }

        public GradeEnum StudentClass { get; set; }

        public ICollection<UserSubjectsDb> UserSubjects { get; set; }
    }
}
