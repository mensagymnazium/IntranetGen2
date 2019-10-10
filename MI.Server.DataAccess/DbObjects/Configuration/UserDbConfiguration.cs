using System.Data.Entity.ModelConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    public class UserDbConfiguration : EntityTypeConfiguration<UserDb>
    {
        public UserDbConfiguration()
        {
            HasIndex(u => u.Guid).IsUnique();
        }
    }
}
