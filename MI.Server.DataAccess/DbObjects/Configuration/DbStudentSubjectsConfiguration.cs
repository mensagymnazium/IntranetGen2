﻿using Microsoft.EntityFrameworkCore;
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
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder
                .HasOne<SubjectDb>(sc => sc.Subject)
                .WithMany(s => s.StudentSubjects);
            builder
                .HasOne<StudentDb>(sc => sc.Student)
                .WithMany(s => s.StudentSubjects);
        }
    }
}
