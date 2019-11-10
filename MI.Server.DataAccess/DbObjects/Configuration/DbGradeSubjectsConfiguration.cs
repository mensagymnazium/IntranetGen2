using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    class DbGradeSubjectsConfiguration : IEntityTypeConfiguration<GradeSubjectsDb>
    {
        public void Configure(EntityTypeBuilder<GradeSubjectsDb> builder)
        {
            builder.ToTable("GradeSubjects");

            builder.HasOne(s => s.Subject)
                .WithMany(gs => gs.GradeSubjects)
                .HasForeignKey(s => s.SubjectId);

            builder.HasOne(g => g.Grade)
                .WithMany(gs => gs.GradeSubjects)
                .HasForeignKey(g => g.GradeId);
        }
    }
}
