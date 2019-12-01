using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public abstract class UserBase : DbBase
    {
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Mail { get; set; }

        public string Password { get; set; }
    }
}
