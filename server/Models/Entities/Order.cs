using System.Text.Json.Serialization;

namespace server.Models.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; } // Khóa ngoại tới User
        public DateTime CreatedAt { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalPrice { get; set; }
        public DeliveryStatus Status { get; set; } // Trạng thái đơn hàng
        public User User { get; set; } // Điều hướng tới User

        //[JsonIgnore]
        public ICollection<OrderItem> OrderItems { get; set; }
        public ICollection<DeliveryHistory> DeliveryHistories { get; set; }
    }
}
