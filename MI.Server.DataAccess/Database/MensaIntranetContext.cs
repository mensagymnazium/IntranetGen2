using MI.Server.DataAccess.DbObjects.Configuration;
using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;

namespace MI.Server.DataAccess.Database
{
    public class MensaIntranetContext : DbContext
    {
        public MensaIntranetContext(DbContextOptions<MensaIntranetContext> options)
            : base(options)
        {
        }

        public DbSet<UserDb> Users { get; set; }
        public DbSet<SubjectDb> Subjects { get; set; }
        public DbSet<UserSubjectsDb> UserSubjects { get; set; }
        public DbSet<GradeSubjectsDb> GradeSubjects { get; set; }
        public DbSet<SigningRulesDb> SigningRules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new DbUserConfiguration());
            modelBuilder.ApplyConfiguration(new DbSubjectConfiguration());
            modelBuilder.ApplyConfiguration(new DbUserSubjectsConfiguration());
            modelBuilder.ApplyConfiguration(new DbGradeSubjectsConfiguration());
        }
    }
}
