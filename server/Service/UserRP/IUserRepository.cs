using Microsoft.AspNetCore.Identity;
using server.Models;
using server.Models.Entities;
using System.Data;

namespace server.Service.UserInterface
{
    public interface IUserRepository
    {
        //User? GetUserById(int id);
        //List<User> GetAllUsers();
        //User AddUser(User user);
        //User UpdateUser(int id,User user);
        //bool DeleteUser(int id);
        public Task<bool> SignUpAsync(SignUpModel signUpModel);
        public Task<string> SignInAsync(SignInModel signInModel);

    }
}
