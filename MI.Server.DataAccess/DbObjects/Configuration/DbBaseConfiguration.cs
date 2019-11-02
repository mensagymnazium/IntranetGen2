using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    internal class DbBaseConfiguration<T> : IEntityTypeConfiguration<T> where T : DbBase
    {
        public DbBaseConfiguration()
        {
        }

        public void Configure(EntityTypeBuilder<T> builder)
        {
            throw new System.NotImplementedException();
        }
    }
}
