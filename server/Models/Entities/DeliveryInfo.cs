using System.ComponentModel.DataAnnotations;

namespace server.Models.Entities
{
    public class DeliveryInfo
    {
        [Key]
        public int DeliveryInfoId { get; set; }

        [Required]
        [MaxLength(250)]
        public string Address { get; set; }

        [Required]
        [MaxLength(15)]
        public string Phone { get; set; }

        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string ReceiverName { get; set; }

        public ICollection<DeliveryHistory> DeliveryHistories { get; set; }
    }
}
