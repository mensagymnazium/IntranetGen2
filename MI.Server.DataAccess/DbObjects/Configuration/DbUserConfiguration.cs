using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    class DbUserConfiguration : IEntityTypeConfiguration<StudentDb>
    {
        public void Configure(EntityTypeBuilder<StudentDb> builder)
        {
            builder.Property(s => s.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Property(s => s.UserName).IsRequired();
            builder.Property(s => s.Password).IsRequired();

            builder.HasBaseType<DbBase>();
        }
    }
}
