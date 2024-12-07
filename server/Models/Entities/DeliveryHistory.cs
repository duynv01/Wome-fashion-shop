using System.ComponentModel.DataAnnotations;

namespace server.Models.Entities
{
    public enum DeliveryStatus
    {
        DangXacNhan = 1,
        DangGui = 2,
        DaGui = 3,
        GiaoThatBai = 4
    }
    public class DeliveryHistory
    {
        [Key]
        public int DeliveryHistoryId { get; set; }

        public int DeliveryInfoId { get; set; }
        public DeliveryInfo DeliveryInfo { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public DeliveryStatus Status { get; set; }
    }
    
}
