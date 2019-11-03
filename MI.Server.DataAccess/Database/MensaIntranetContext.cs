using MI.Server.DataAccess.DbObjects;
using MI.Server.DataAccess.DbObjects.Configuration;
using Microsoft.EntityFrameworkCore;

namespace MI.Server.DataAccess.Database
{
    public class MensaIntranetContext : DbContext
    {
        public MensaIntranetContext(DbContextOptions<MensaIntranetContext> options) 
            : base(options)
        {
        }

        public DbSet<StudentDb> Students { get; set; }
        public DbSet<SubjectDb> Subjects { get; set; }
        public DbSet<TeacherDb> Teachers { get; set; }
        public DbSet<StudentSubjectsDb> StudentSubjects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Configurations.Add(new SubjectDbConfiguration());
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new DbBaseConfiguration());
            modelBuilder.ApplyConfiguration(new DbUserConfiguration());
            modelBuilder.ApplyConfiguration(new DbTeacherConfiguration());
            modelBuilder.ApplyConfiguration(new DbSubjectConfiguration());
            modelBuilder.ApplyConfiguration(new DbStudentSubjectsConfiguration());

            modelBuilder.Entity<StudentDb>().ToTable("Students");
            modelBuilder.Entity<SubjectDb>().ToTable("Subjects");
            modelBuilder.Entity<TeacherDb>().ToTable("Teachers");
            modelBuilder.Entity<StudentSubjectsDb>().ToTable("StudentSubjects");
        }
    }
}
