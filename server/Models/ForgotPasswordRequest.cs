using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class ForgotPasswordRequest
    {
        [Required]
        public string Email { get; set; }
    }
}
