using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class StudentDb : UserBase
    {
        public GradeEnum StudentClass { get; set; }
        public ICollection<StudentSubjectsDb> StudentSubjects { get; set; }
    }
}
