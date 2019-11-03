using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    class DbStudentSubjectsConfiguration : IEntityTypeConfiguration<StudentSubjectsDb>
    {
        public void Configure(EntityTypeBuilder<StudentSubjectsDb> builder)
        {
            builder
                .HasOne<SubjectDb>(sc => sc.Subject)
                .WithMany(s => s.StudentSubjects)
                .HasForeignKey(s => s.Id);

            builder
                .HasOne<StudentDb>(sc => sc.Student)
                .WithMany(s => s.StudentSubjects)
                .HasForeignKey(s => s.Id);
        }
    }
}
