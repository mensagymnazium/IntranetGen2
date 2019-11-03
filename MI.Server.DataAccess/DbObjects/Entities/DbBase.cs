using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public abstract class DbBase
    {
        public bool IsDeleted { get; set; } = false;
        public int Id { get; set; }
    }
}
