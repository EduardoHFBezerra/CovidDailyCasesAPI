using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CovidDailyCases.API.Models;

namespace CovidDailyCases.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {
            
        }
        public DbSet<Cases> cases { get; set; }
    }
}