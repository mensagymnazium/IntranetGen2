using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using MI.Server.DataAccess.Database;
using MI.Server.BusinessLogic;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.Cors;

namespace MI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddControllers().AddNewtonsoftJson();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddDbContext<MensaIntranetContext>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("MIContext")));

            services.AddScoped<BusinessManager>();

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                // note: the tenant id (authority) and client id (audience)
                // should normally be pulled from the config file or ENV vars.
                // this code uses an inline example for brevity.

                options.Authority = "https://login.microsoftonline.com/bc4facfa-6ca4-4771-aa06-3bce0418701c";
                //options.Audience = "api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf";
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidAudience = "api://6842fe3c-f09c-4ec1-b6b0-1d15cf6a37bf"
                };
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsApi",
                    builder => builder.WithOrigins("https://intranet.mensagymnazium.cz", "https://172.24.8.13:443")
                .AllowAnyHeader()
                .AllowAnyMethod());
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseCors("AllowAll");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
