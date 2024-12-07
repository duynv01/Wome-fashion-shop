using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace server.Models.Entities
{
    public class User 
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string? FullName { get; set; }
        public string? Address { get; set; }
        public string? Phone {  get; set; }
        public DateTime CreatedAt { get; set; }
        public string Role { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<DeliveryHistory> DeliveryHistories { get; set; }
    }
}
