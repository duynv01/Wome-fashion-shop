using System.Drawing;

namespace server.Models.Entities
{
    public class ProductColor
    {
        public int ProductColorId { get; set; }
        public int ProductId { get; set; } // Khóa ngoại tới Product
        public int ColorId { get; set; } // Khóa ngoại tới Color

        public Product Product { get; set; }
        public Colors Color { get; set; }
    }
}
