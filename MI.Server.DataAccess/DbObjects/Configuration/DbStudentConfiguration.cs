using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    internal class DbStudentConfiguration : IEntityTypeConfiguration<DbStudentConfiguration>
    {
        public void Configure(EntityTypeBuilder<DbStudentConfiguration> builder)
        {
            builder.HasBaseType<UserBase>();
        }
    }
}