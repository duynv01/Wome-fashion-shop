using server.Models;
using server.Models.Entities;

namespace server.Service.UserInterface
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User?> GetUserById(int id);
        Task<User?> GetUserByUsername(string username);
        Task<User?> GetUserByEmail(string email);
        Task AddUser(User user);
        Task UpdateUser(User user);
        Task UpdateUserDto(int id, UpdateUserDto updateUserDto);
        Task<int> GetUserCountByRoleAsync(DateTime? fromDate, DateTime? toDate);
    }
}
