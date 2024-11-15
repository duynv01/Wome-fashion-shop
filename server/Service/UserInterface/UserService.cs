using Microsoft.EntityFrameworkCore;
using server.Models.Entities;
using server.Service.UserInterface;
using System.Threading.Tasks;
using System.Data;
using server.Data;
using server.Models;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;

namespace server.Service
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UserService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy người dùng bằng Username
        public async Task<User?> GetUserByUsername(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
        }

        // Lấy người dùng bằng Email
        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
        }

        // Thêm người dùng mới
        public async Task AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        // Cập nhật thông tin người dùng
        public async Task UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task UpdateUserDto(int id, UpdateUserDto updateUserDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                throw new Exception("User not found.");
            }

            if (!string.IsNullOrEmpty(updateUserDto.Fullname))
                user.FullName = updateUserDto.Fullname;

            if (!string.IsNullOrEmpty(updateUserDto.Address))
                user.Address = updateUserDto.Address;

            if (!string.IsNullOrEmpty(updateUserDto.Phone))
                user.Phone = updateUserDto.Phone;

            await _context.SaveChangesAsync();
        }
    }
}
