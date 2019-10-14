using System.Data.Entity.ModelConfiguration;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    internal class DbBaseConfiguration<T> : EntityTypeConfiguration<T> where T : DbBase
    {
        public DbBaseConfiguration()
        {
            HasKey(u => u.Id);
        }
    }
}
