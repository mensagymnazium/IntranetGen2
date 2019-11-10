using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class TeacherDb : UserBase
    {
        public virtual ICollection<SubjectDb> Subjects { get; set; }
    }
}
