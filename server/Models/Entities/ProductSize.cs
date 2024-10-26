using System.Drawing;

namespace server.Models.Entities
{
    public class ProductSize
    {
        public int ProductSizeId { get; set; }
        public int ProductId { get; set; } // Khóa ngoại tới Product
        public int SizeId { get; set; } // Khóa ngoại tới Size

        public Product Product { get; set; }
        public Sizes Size { get; set; }
    }
}
