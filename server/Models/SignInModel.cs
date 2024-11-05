using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class SignInModel
    {
        [Required]
        public string UserName { get; set; } = null!;
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; } = null!;
    }
}
