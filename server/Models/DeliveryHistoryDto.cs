namespace server.Models
{
    public class DeliveryHistoryDto
    {
        public int DeliveryHistoryId { get; set; }
        public int DeliveryInfoId { get; set; }
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; }
    }
}
