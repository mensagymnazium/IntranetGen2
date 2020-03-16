using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class UserSubjectsDb : DbBase
    {
        public int UserId { get; set; }
        public UserDb User { get; set; }
        public int SubjectId { get; set; }
        public SubjectDb Subject { get; set; }

        public Priority Priority { get; set; }
    }
}
