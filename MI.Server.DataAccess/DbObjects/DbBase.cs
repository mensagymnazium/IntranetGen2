using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public abstract class DbBase
    {
        public Guid Id { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}
