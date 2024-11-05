using server.Models.Entities;

namespace server.Service.UserInterface
{
    public interface IUserService
    {
        Task<User> GetUserByUsername(string username);
        Task<User> GetUserByEmail(string email);
        Task AddUser(User user);
        Task UpdateUser(User user);
    }
}
