using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    class DbTeacherConfiguration : IEntityTypeConfiguration<TeacherDb>
    { 
        public void Configure(EntityTypeBuilder<TeacherDb> builder)
        {
            builder.HasKey(s => s.UserId);
            builder.Property(s => s.UserId).ValueGeneratedOnAdd();
            builder.Property(s => s.UserName).IsRequired();
            builder.Property(s => s.Password).IsRequired();

        }
    }
}
