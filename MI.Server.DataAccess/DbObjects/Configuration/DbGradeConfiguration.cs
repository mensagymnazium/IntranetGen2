using System;
using System.Collections.Generic;
using System.Text;
using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    class DbGradeConfiguration : IEntityTypeConfiguration<GradeDb>
    {
        public void Configure(EntityTypeBuilder<GradeDb> builder)
        {
            builder.ToTable("Grades");

        }
    }
}
