using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    class DbUserConfiguration : IEntityTypeConfiguration<UserDb>
    {
        public void Configure(EntityTypeBuilder<UserDb> builder)
        {
            builder.ToTable("Users");

            builder.HasMany(s => s.Submissions).WithOne(u => u.User);
        }
    }
}