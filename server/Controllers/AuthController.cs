using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.Models.Entities;
using server.Models;
using server.Service.UserInterface;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using server.Service;
using System.IO;
using System.Threading.Tasks;

namespace server.Controllers
{
    //localhost:5000/api/auth
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public AuthController(IUserService userService, IConfiguration configuration, IEmailService emailService)
        {
            _userService = userService;
            _configuration = configuration;
            _emailService = emailService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userService.GetUserByUsername(request.Username);

            if (user == null || !PasswordHasher.VerifyPassword(request.Password, user.Password))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                Id = user.UserId,
                Username = user.Username,
                Role = user.Role,
                Token = token
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var existingUser = await _userService.GetUserByUsername(request.Username);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Username already exists" });
            }

            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                CreatedAt = DateTime.UtcNow,
                Role = "User",
                Password = PasswordHasher.HashPassword(request.Password)
            };

            await _userService.AddUser(user);

            return Ok(new { message = "User registered successfully" });
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var user = await _userService.GetUserByEmail(request.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Email does not exist" });
            }

            // Tạo mật khẩu mới ngẫu nhiên
            var newPassword = GenerateTemporaryPassword();
            user.Password = PasswordHasher.HashPassword(newPassword);

            // Cập nhật mật khẩu trong cơ sở dữ liệu
            await _userService.UpdateUser(user);

            // Gửi mật khẩu mới qua email
            var subject = "Your New Password";
            var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "EmailTemplate.html");
            var body = await System.IO.File.ReadAllTextAsync(templatePath);
            body = body.Replace("{username}", user.Username)
                       .Replace("{newPassword}", newPassword);

            await _emailService.SendEmailAsync(user.Email, subject, body);
            return Ok(new { message = "A new password has been sent to your email." });
        }

        private string GenerateTemporaryPassword()
        {
            return Guid.NewGuid().ToString("N").Substring(0, 8);
        }
    }

}
