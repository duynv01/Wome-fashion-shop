namespace server.Models
{
    public class DeliveryInfoDto
    {
        public int OrderId { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string ReceiverName { get; set; }
    }
}
