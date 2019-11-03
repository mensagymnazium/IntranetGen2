using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public class TeacherDb
    {
        public string UserName { get; set; }
        public int UserId { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Mail { get; set; }

        public string Password { get; set; }
        public virtual ICollection<SubjectDb> Subjects { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
