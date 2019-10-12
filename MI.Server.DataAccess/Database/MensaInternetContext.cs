using MI.Server.DataAccess.DbObjects;
using MI.Server.DataAccess.DbObjects.Configuration;
using System.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.Database
{
    public class MensaIntranetContext : DbContext
    {
        public MensaIntranetContext() : base("DataSource=.;Integrated Security=True;Database=MITestDb")
        {
            Configuration.AutoDetectChangesEnabled = true;
            Configuration.LazyLoadingEnabled = false;
            Database.Initialize(true);
        }

        public DbSet<UserDb> Users { get; set; }
        public DbSet<SubjectDb> Subjects { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new UserDbConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}
