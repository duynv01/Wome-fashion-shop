namespace server.Models.Entities
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; } // Khóa ngoại tới Order
        public int ProductId { get; set; } // Khóa ngoại tới Product
        public int Amount { get; set; }
        public decimal Price { get; set; } // Giá tại thời điểm mua

        public Order Order { get; set; } // Điều hướng tới Order
        public Product Product { get; set; } // Điều hướng tới Product
    }
}
