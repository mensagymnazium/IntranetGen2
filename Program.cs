using MI.Server.DataAccess.Database;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace MI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            using (var context = new MensaIntranetContext())
            {
                context.Database.EnsureCreated();
            }
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
