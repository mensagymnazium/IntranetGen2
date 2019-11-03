using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public class StudentDb : UserBase
    {
        
        public virtual ICollection<SubjectDb> Subjects { get; set; }
        public GradeEnum StudentClass { get; set; }
        public ICollection<StudentSubjectsDb> StudentSubjects { get; set; }
    }
}
