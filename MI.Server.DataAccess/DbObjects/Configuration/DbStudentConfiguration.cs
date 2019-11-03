using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    class DbStudentConfiguration : IEntityTypeConfiguration<StudentDb>
    {
        public void Configure(EntityTypeBuilder<StudentDb> builder)
        {
        }
    }
}