using System.ComponentModel.DataAnnotations;

namespace server.Models.Entities
{
    public class DeliveryInfo
    {
        [Key]
        public int DeliveryInfoId { get; set; }
        public int OrderId { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public string ReceiverName { get; set; }
        public Order Order { get; set; }
    }
}
