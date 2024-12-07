using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Text.Json.Serialization;

namespace server.Models.Entities
{
    public class Product
    {
        public int ProductId { get; set; }

        [MaxLength(50)]
        [Required]
        public string Sku { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public int CategoryId { get; set; }
        public string? ImagePath { get; set; }

        public Category Category { get; set; } // Điều hướng tới Category
        public ICollection<ProductColor> ProductColors { get; set; }
        public ICollection<ProductSize> ProductSizes { get; set; }

        //[JsonIgnore] Ngừng tuần tự hóa, tránh vòng lặp
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
