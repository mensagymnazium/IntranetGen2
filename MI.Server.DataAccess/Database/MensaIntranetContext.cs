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

        public DbSet<StudentDb> Students { get; set; }
        public DbSet<SubjectDb> Subjects { get; set; }
        public DbSet<TeacherDb> Teachers { get; set; }
        public DbSet<StudentSubjectsDb> StudentSubjects { get; set; }
        public DbSet<GradeSubjectsDb> GradeSubjects { get; set; }
        public DbSet<GradeDb> Grades { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new DbStudentConfiguration());
            modelBuilder.ApplyConfiguration(new DbTeacherConfiguration());
            modelBuilder.ApplyConfiguration(new DbSubjectConfiguration());
            modelBuilder.ApplyConfiguration(new DbStudentSubjectsConfiguration());
            modelBuilder.ApplyConfiguration(new DbGradeSubjectsConfiguration());
            modelBuilder.ApplyConfiguration(new DbGradeConfiguration());
        }
    }
}
