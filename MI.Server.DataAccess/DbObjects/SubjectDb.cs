using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public class SubjectDb : DbBase
    {
        public SubjectDb()
        {
            Students = new HashSet<StudentDb>();
        }

        public virtual ICollection<StudentDb> Students { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Time { get; set; }
        public int ForClass { get; set; }
    }
}
