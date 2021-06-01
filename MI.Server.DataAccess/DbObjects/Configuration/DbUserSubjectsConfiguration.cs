using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    internal class DbUserSubjectsConfiguration : IEntityTypeConfiguration<UserSubjectsDb>
    {
        public void Configure(EntityTypeBuilder<UserSubjectsDb> builder)
        {
            builder.ToTable("UserSubjects");

            builder
                .HasOne(sc => sc.Subject)
                .WithMany(s => s.UserSubjects)
                .HasForeignKey(s => s.SubjectId);
            builder
                .HasOne(sc => sc.User)
                .WithMany(s => s.UserSubjects)
                .HasForeignKey(s => s.UserId);
        }
    }
}
