using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public abstract class UserBase : DbBase
    {
        public string UserName { get; set; }

        public string Surname { get; set; }

        public string Firstname { get; set; }

        public string Mail { get; set; }

        public string Password { get; set; }
    }
}
