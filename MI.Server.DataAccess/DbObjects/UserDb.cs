using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MI.Server.DataAccess.DbObjects
{
    public class UserDb : DbBase

    {
        public Guid Guid { get; set; }

        public UserDb()
        {
            Subjects = new HashSet<SubjectDb>();
        }

        public virtual ICollection<SubjectDb> Subjects { get; set; }

        public string UserName { get; set; }


        public string Surname { get; set; }

        public string Firstname { get; set; }

        public string Mail { get; set; }

        public string Password { get; set; }

    }
}
