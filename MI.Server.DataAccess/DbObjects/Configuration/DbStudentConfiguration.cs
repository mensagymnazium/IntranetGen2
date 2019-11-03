using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    internal class DbStudentConfiguration : IEntityTypeConfiguration<StudentDb>
    {
        public void Configure(EntityTypeBuilder<StudentDb> builder)
        {
            builder.HasKey(s => s.UserId);
            builder.Property(s => s.UserId).ValueGeneratedOnAdd();
            builder.Property(s => s.UserName).IsRequired();
            builder.Property(s => s.Password).IsRequired();
        }
    }
}