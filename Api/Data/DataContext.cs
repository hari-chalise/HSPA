using Microsoft.EntityFrameworkCore;
using Api.Models;
namespace Api.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }

        public DbSet<City> cities { get; set; }
    }
}