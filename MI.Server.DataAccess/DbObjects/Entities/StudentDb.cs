using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public class StudentDb
    {
        public string UserName { get; set; }
        public int UserId { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Mail { get; set; }

        public string Password { get; set; }

        public virtual ICollection<SubjectDb> Subjects { get; set; }
        public GradeEnum StudentClass { get; set; }
        public ICollection<StudentSubjectsDb> StudentSubjects { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
