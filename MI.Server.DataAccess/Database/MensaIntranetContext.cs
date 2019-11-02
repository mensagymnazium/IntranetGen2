using MI.Server.DataAccess.DbObjects;
using MI.Server.DataAccess.DbObjects.Configuration;
using Microsoft.EntityFrameworkCore;

namespace MI.Server.DataAccess.Database
{
    public class MensaIntranetContext : DbContext
    {
        public MensaIntranetContext(/*: base("Data Source=.;Integrated Security=True;Database=MITestDb") DbContextOptions<MensaIntranetContext> options) : base(options)*/)
        {
            ChangeTracker.AutoDetectChangesEnabled = true;
            ChangeTracker.LazyLoadingEnabled = false;
            Database.EnsureCreated();
        }

        public DbSet<StudentDb> Students { get; set; }
        public DbSet<SubjectDb> Subjects { get; set; }
        public DbSet<TeacherDb> Teachers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Configurations.Add(new SubjectDbConfiguration());
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<StudentDb>(entity => {
                entity.HasKey(s => s.Id);
                entity.Property(s => s.Id).IsRequired().ValueGeneratedOnAdd();
                entity.Property(s => s.UserName).IsRequired();
                entity.Property(s => s.Password).IsRequired();
            });
            modelBuilder.Entity<SubjectDb>(entity => {
                entity.HasKey(s => s.SubjectId);
            });
            modelBuilder.Entity<SubjectDb>()
                .HasOne<TeacherDb>(s => s.Teacher)
                .WithMany(s => s.Subjects)
                .HasForeignKey(s => s.SubjectId);
            modelBuilder.Entity<TeacherDb>(entity=> {
                entity.HasKey(t => t.Id);
                entity.Property(t=>t.UserName).IsRequired();
                entity.Property(t => t.Password).IsRequired();
            });
        }
    }
}
