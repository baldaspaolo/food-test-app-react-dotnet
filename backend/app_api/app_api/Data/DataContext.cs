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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasMany(p => p.Receipts)
                .WithMany(r => r.Products)
                .UsingEntity(j => j.ToTable("ProductReceipt"));

             modelBuilder.Entity<Product>()
            .HasMany(p => p.Receipts)
            .WithMany(r => r.Products)
            .UsingEntity(j =>
            {
                j.ToTable("ProductReceipt");
                j.Property<int>("Quantity").IsRequired(); // Add the Quantity column
             });


        }
        public DbSet<Food> Foods { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Department> Departments { get; set; }

        public DbSet<ToDo> ToDos { get; set; }
        public DbSet<Tasks> Tasks { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
       
        




    }
}
