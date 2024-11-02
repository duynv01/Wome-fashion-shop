using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class SignUpModel
    {
        [Required]
        public string Username { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }
}
