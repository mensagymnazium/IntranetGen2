using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    public class DbSubmissionConfiguration : IEntityTypeConfiguration<SubmissionDb>
    {
        public void Configure(EntityTypeBuilder<SubmissionDb> builder)
        {
            builder.ToTable("Submissions");
        }
    }
}