using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    public class DbAssignmentConfiguration : IEntityTypeConfiguration<AssignmentDb>
    {
        public void Configure(EntityTypeBuilder<AssignmentDb> builder)
        {
            builder.ToTable("Assignments");

            builder.HasMany(s => s.Submissions).WithOne(a => a.Assignment);
        }
    }
}