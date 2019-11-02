using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MI.Server.DataAccess.DbObjects;

namespace MI.Models
{
    public class MIContext : DbContext
    {
        public MIContext (DbContextOptions<MIContext> options)
            : base(options)
        {
        }

        public DbSet<MI.Server.DataAccess.DbObjects.SubjectDb> SubjectDb { get; set; }
    }
}
