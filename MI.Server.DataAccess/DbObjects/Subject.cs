using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public class SubjectDb : DbBase
    {
        public SubjectDb()
        {
            Users = new HashSet<UserDb>();
        }

        public virtual ICollection<UserDb> Users { get; set; }

        public Guid Guid { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Time { get; set; }
        public string Field { get; set; }

        public bool ForPrima { get; set; }
        public bool ForSekunda { get; set; }
        public bool ForTercie { get; set; }
        public bool ForKvarta { get; set; }
        public bool ForKvinta { get; set; }
        public bool ForSexta { get; set; }
        public bool ForSeptima { get; set; }
        public bool ForOktava { get; set; }

        public string Type { get; set; }

        public bool IsActiveDirectory { get; set; }
    }
}
