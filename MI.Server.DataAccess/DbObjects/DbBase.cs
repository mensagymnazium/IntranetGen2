using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public abstract class DbBase
    {
        public int Id { get; set; }

        public int ModifiedUserId { get; set; }

        public DateTime ModifiedDateTime { get; set; } = DateTime.Now;

        public bool IsDeleted { get; set; } = false;

    }
}
