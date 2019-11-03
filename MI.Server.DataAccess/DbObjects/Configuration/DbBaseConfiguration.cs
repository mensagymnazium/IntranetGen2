using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    internal class DbBaseConfiguration : IEntityTypeConfiguration<DbBase>
    {
        public void Configure(EntityTypeBuilder<DbBase> builder)
        {
            builder.Property(b=>b.Id).ValueGeneratedOnAdd().IsRequired();
        }
    }
}
