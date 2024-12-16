namespace server.Data
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using server.Models.Entities;
    using System.Drawing;

    public class AppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Colors> Colors { get; set; }
        public DbSet<Sizes> Sizes { get; set; }
        public DbSet<ProductColor> ProductColors { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<DeliveryInfo> DeliveryInfos { get; set; }
        public DbSet<DeliveryHistory> DeliveryHistories { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlServer(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Cấu hình các quan hệ
            modelBuilder.Entity<Colors>()
                .HasKey(c => c.ColorId);

            modelBuilder.Entity<Colors>().HasData(
                new Colors { ColorId = 1, Name = "Black" },
                new Colors { ColorId = 2, Name = "White" },
                new Colors { ColorId = 3, Name = "Brown" }
            );

            modelBuilder.Entity<Sizes>()
                .HasKey(c => c.SizeId);

            modelBuilder.Entity<Sizes>().HasData(
                new Sizes { SizeId = 1, Name = "Small" },
                new Sizes { SizeId = 2, Name = "Medium" },
                new Sizes { SizeId = 3, Name = "Large" }
            );

            modelBuilder.Entity<ProductColor>()
                .HasKey(pc => new { pc.ProductColorId });

            modelBuilder.Entity<ProductSize>()
                .HasKey(ps => new { ps.ProductSizeId });

            modelBuilder.Entity<ProductColor>()
                .HasOne(pc => pc.Product)
                .WithMany(p => p.ProductColors)
                .HasForeignKey(pc => pc.ProductId);

            modelBuilder.Entity<ProductColor>()
                .HasOne(pc => pc.Color)
                .WithMany(c => c.ProductColors)
                .HasForeignKey(pc => pc.ColorId);

            modelBuilder.Entity<ProductSize>()
                .HasOne(ps => ps.Product)
                .WithMany(p => p.ProductSizes)
                .HasForeignKey(ps => ps.ProductId);

            modelBuilder.Entity<ProductSize>()
                .HasOne(ps => ps.Size)
                .WithMany(s => s.ProductSizes)
                .HasForeignKey(ps => ps.SizeId);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Username).IsUnique();
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            });

            modelBuilder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.Status)
                    .HasConversion(
                        v => v.ToString(), 
                        v => (DeliveryStatus)Enum.Parse(typeof(DeliveryStatus), v) // Chuyển đổi ngược thành enum
                    );
            });

            modelBuilder.Entity<Product>()
                .HasMany(p => p.OrderItems)
                .WithOne(oi => oi.Product)
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category) 
                .WithMany(c => c.Products) 
                .HasForeignKey(p => p.CategoryId)
                .IsRequired();
            modelBuilder.Entity<Product>()
                .HasMany(p => p.ProductImages)
                .WithOne(pi => pi.Product)
                .HasForeignKey(pi => pi.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderItem>()
                .HasKey(oi => oi.OrderItemId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Product)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DeliveryHistory>()
               .HasOne(dh => dh.DeliveryInfo)
               .WithMany(di => di.DeliveryHistories)
               .HasForeignKey(dh => dh.DeliveryInfoId)  
               .OnDelete(DeleteBehavior.Restrict);      

            modelBuilder.Entity<DeliveryHistory>()
                .HasOne(dh => dh.Order)                 
                .WithMany(o => o.DeliveryHistories)                             
                .HasForeignKey(dh => dh.OrderId)        
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DeliveryHistory>()
                .HasOne(dh => dh.User)
                .WithMany(u => u.DeliveryHistories)
                .HasForeignKey(dh => dh.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DeliveryHistory>()
                .Property(d => d.Status)
                .HasConversion<string>();
        }
    }
}
