using System;
using System.IO;
using AutoMapper;
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
using MI.Server.BusinessLogic.DTO;
using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;

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
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<AssignmentDb, AssignmentDto>();
                cfg.CreateMap<SubmissionDb, SubmissionDto>();
                cfg.CreateMap<UserDb, UserDto>();
                cfg.CreateMap<SubmissionDb, SubmissionDto>().ForMember(x => x.UploadTime,
                    opt => opt.MapFrom(src => ((DateTime)src.UploadTime).ToString("dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture)));
                cfg.CreateMap<AssignmentDb, AssignmentDto>().ForMember(x => x.Deadline,
                    opt => opt.MapFrom(src => ((DateTime)src.Deadline).ToString("dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture)));
                //TODO do technical debt
            });
            services.AddSingleton(configuration.CreateMapper());

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

            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

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
            app.UseCors("MyPolicy");

            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            //app.UseStaticFiles(new StaticFileOptions()
            //{
            //    FileProvider = new PhysicalFileProvider
            //        (Path.Combine(Directory.GetCurrentDirectory(), @"UploadedFiles")),
            //    RequestPath = new PathString(Configuration["SavePath"])
            //});
            app.UseRouting();

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
