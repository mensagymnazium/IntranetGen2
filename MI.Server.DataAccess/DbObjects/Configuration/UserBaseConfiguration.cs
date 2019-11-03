using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Configuration
{
    public abstract class UserBaseConfiguration : IEntityTypeConfiguration<UserBase>
    {
        public void Configure(EntityTypeBuilder<UserBase> builder)
        {
            builder.HasKey(s => s.UserName);
            builder.Property(s => s.UserName).IsRequired();
            builder.Property(s => s.Password).IsRequired();
        }
    }
}
