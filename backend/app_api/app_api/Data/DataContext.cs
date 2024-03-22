using Microsoft.EntityFrameworkCore;

namespace app_api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Data Source=DESKTOP-6JQKPL0;Initial Catalog=foodsDb;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False");
        }

        public DbSet<Food> Foods { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Department> Departments { get; set; }


       
    }
}
