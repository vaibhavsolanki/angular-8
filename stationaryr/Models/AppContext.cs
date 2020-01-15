
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication3.Models;

namespace WebApplication3.Models
{
    public class AngularContext:DbContext
    {
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

    //    public DbSet<USER> Users { get; set; }
      
    }
}
