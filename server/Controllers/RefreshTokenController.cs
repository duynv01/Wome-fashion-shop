using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Models;
using server.Models.Entities;
using server.Service;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefreshTokenController : ControllerBase
    {
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        
        public RefreshTokenController(IRefreshTokenRepository refreshTokenRepository)
        {
            _refreshTokenRepository = refreshTokenRepository;
        }

        [HttpPost("Register")]
        public IActionResult Validate(RegisterModel registerModel)
        {
            var user = _refreshTokenRepository.Validate(registerModel);
            if (user == null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid username/password"
                });
            }

            var token = _refreshTokenRepository.GenerateToken(user);

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Authenticate success",
                Data = token
            });
        }

        [HttpPost("RenewToken")]
        public IActionResult RenewToken(TokenModel tokenModel)
        {
            var response = _refreshTokenRepository.RenewToken(tokenModel);
            return Ok(response);
        }

        
    }
}
