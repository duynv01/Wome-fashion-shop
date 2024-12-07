using server.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class ProductViewModel
    {
        public int ProductId { get; set; } 
        public string Sku { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int? ColorId { get; set; }
        public string ColorName { get; set; } 
        public int? SizeId { get; set; }
        public string SizeName { get; set; }
    }
}
