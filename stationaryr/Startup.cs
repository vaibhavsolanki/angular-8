using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using stationaryr.Models;
using stationaryr.Authorization;
using Microsoft.AspNetCore.Identity;
using System;
using System.Text;
using stationaryr.Core.Interface;
using stationaryr.Core;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace stationaryr
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

            services.AddMvc(options => {
                options.RespectBrowserAcceptHeader = true;
            }).AddJsonOptions(o =>
            {
                o.JsonSerializerOptions.PropertyNamingPolicy = null;
                o.JsonSerializerOptions.DictionaryKeyPolicy = null;
            });
            services.AddAutoMapper(typeof(Startup));
            services.AddTransient<IUserStore<ApplicationUser>, UserStore>();
            services.AddTransient<IRoleStore<ApplicationRole>, RoleStore>();

            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddDefaultTokenProviders();
            services.AddScoped<IAccountManager, AccountManager>(); 

            //services.AddSingleton<IAuthorizationHandler, ViewUserAuthorizationHandler>();
            //services.AddSingleton<IAuthorizationHandler, ManageUserAuthorizationHandler>();
            //services.AddSingleton<IAuthorizationHandler, ViewRoleAuthorizationHandler>();
            //services.AddSingleton<IAuthorizationHandler, AssignRolesAuthorizationHandler>();

            //services.AddIdentity<ApplicationUser, ApplicationRole>();
            //// Configure Identity options and password complexity here
            //services.Configure<IdentityOptions>(options =>
            //{
            //    // User settings
            //    options.User.RequireUniqueEmail = true;

            //    //    //// Password settings
            //    //    //options.Password.RequireDigit = true;
            //    //    //options.Password.RequiredLength = 8;
            //    //    //options.Password.RequireNonAlphanumeric = false;
            //    //    //options.Password.RequireUppercase = true;
            //    //    //options.Password.RequireLowercase = false;

            //    //    //// Lockout settings
            //    //    //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
            //    //    //options.Lockout.MaxFailedAccessAttempts = 10;
            //});


            //services.AddIdentityServer()
            //   // The AddDeveloperSigningCredential extension creates temporary key material for signing tokens.
            //   // This might be useful to get started, but needs to be replaced by some persistent key material for production scenarios.
            //   // See http://docs.identityserver.io/en/release/topics/crypto.html#refcrypto for more information.
            //   .AddDeveloperSigningCredential()
            //   .AddInMemoryPersistedGrants()
            //   // To configure IdentityServer to use EntityFramework (EF) as the storage mechanism for configuration data (rather than using the in-memory implementations),
            //   // see https://identityserver4.readthedocs.io/en/release/quickstarts/8_entity_framework.html
            //   .AddInMemoryIdentityResources(IdentityServerConfig.GetIdentityResources())
            //   .AddInMemoryApiResources(IdentityServerConfig.GetApiResources())
            //   .AddInMemoryClients(IdentityServerConfig.GetClients())
            //    .AddAspNetIdentity<ApplicationUser>()
            //   .AddProfileService<ProfileService>();




            //var applicationUrl = Configuration["ApplicationUrl"].TrimEnd('/');

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.RequireHttpsMetadata = false;
                   options.SaveToken = true;
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuer = true,
                       ValidateAudience = true,
                       ValidateLifetime = true,
                       ValidateIssuerSigningKey = true,
                       ValidIssuer = Configuration["Jwt:Issuer"],
                       ValidAudience = Configuration["Jwt:Audience"],
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                       ClockSkew = TimeSpan.Zero
                   };
                   services.AddCors();
               });
            services.AddAuthorization();
            //services.AddAuthorization(config =>
            //{
            //    config.AddPolicy(Policies.Admin, Policies.AdminPolicy());
            //    config.AddPolicy(Policies.User, Policies.UserPolicy());
            //});
            services.AddControllers();
            services.AddControllersWithViews();
          

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
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

            app.UseRouting();
            app.UseCors(builder => builder
              .AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());

          //app.UseIdentityServer();
         
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseHttpsRedirection();
            app.UseDefaultFiles();
          //  app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

          

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
