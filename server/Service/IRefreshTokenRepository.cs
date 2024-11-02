using server.Models.Entities;
using server.Models;

namespace server.Service
{
    public interface IRefreshTokenRepository
    {
        User? Validate(RegisterModel registerModel);
        TokenModel GenerateToken(User user);
        string GenerateRefreshToken();
        ApiResponse RenewToken(TokenModel tokenModel);
        DateTime ConvertUnixTimeToDateTime(long utcExpireDate);
    }
}
