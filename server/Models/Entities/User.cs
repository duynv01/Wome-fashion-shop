using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace server.Models.Entities
{
    public class User 
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Role { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
