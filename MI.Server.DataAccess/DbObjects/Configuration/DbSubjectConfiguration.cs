using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    class DbSubjectConfiguration : IEntityTypeConfiguration<SubjectDb>
    {
        public void Configure(EntityTypeBuilder<SubjectDb> builder)
        {
            builder.HasKey(s => s.SubjectId);
            builder.HasOne<TeacherDb>(s => s.Teacher)
                .WithMany(s => s.Subjects);
        }
    }
}
