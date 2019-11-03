using MI.Server.DataAccess.DbObjects.Entities;
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

        }
    }
}
