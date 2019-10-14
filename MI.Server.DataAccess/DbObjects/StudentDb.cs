using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public class StudentDb : UserBase
    {
        public StudentDb()
        {
            Subjects = new HashSet<SubjectDb>();
        }

        public virtual ICollection<SubjectDb> Subjects { get; set; }

        public string StudentClass { get; set; }
    }
}
