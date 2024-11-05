using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Models;
using server.Models.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Service.UserInterface
{
    public class UserRepository : IUserRepository
    {
        //private readonly UserManager<ApplicationUser> userManager;
        //private readonly SignInManager<ApplicationUser> signInManager;
        //private readonly IConfiguration configuration;
        //private readonly RoleManager<IdentityRole> roleManager;

        //public UserRepository(UserManager<ApplicationUser> userManager,
        //    SignInManager<ApplicationUser> signInManager, IConfiguration configuration,
        //    RoleManager<IdentityRole> roleManager)
        //{
        //    this.userManager = userManager;
        //    this.signInManager = signInManager;
        //    this.configuration = configuration;
        //    this.roleManager = roleManager;
        //}
        //public User AddUser(User user)
        //{
        //    _context.Users.Add(user);
        //    _context.SaveChanges();
        //    return user;
        //}

        //public bool DeleteUser(int id)
        //{
        //    var user = GetUserById(id);
        //    if (user == null) return false;

        //    _context.Users.Remove(user);
        //    _context.SaveChanges();
        //    return true;
        //}

        //public List<User> GetAllUsers()
        //{
        //    var user = _context.Users.ToList();
        //    return user;
        //}

        //public User? GetUserById(int userId)
        //{
        //    return _context.Users.SingleOrDefault(u => u.UserId == userId);
        //}

        //public User UpdateUser(int id, User user)
        //{
        //    var existingUser = GetUserById(user.UserId);
        //    if (existingUser == null) return null;

        //    existingUser.Username = user.Username;
        //    existingUser.Password = user.Password; 
        //    existingUser.Email = user.Email;
        //    existingUser.Role = user.Role;
        //    existingUser.CreatedAt = user.CreatedAt; 

        //    _context.Users.Update(existingUser);
        //    _context.SaveChanges();
        //    return existingUser;
        //}

        //public async Task<string> SignInAsync(SignInModel signInModel)
        //{
        //    var user = await userManager.FindByEmailAsync(signInModel.Email);
        //    var passwordValid = await userManager.CheckPasswordAsync(user, signInModel.Password);

        //    if (user == null || !passwordValid)
        //    {
        //        return string.Empty;
        //    }

        //    var authClaims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Email, signInModel.Email),
        //        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        //    };
        //    var userRoles = await userManager.GetRolesAsync(user);
        //    foreach (var role in userRoles)
        //    {
        //        authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
        //    }

        //    var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
        //    var token = new JwtSecurityToken(
        //            issuer: configuration["JWT:ValidIssuer"],
        //            audience: configuration["JWT:ValidAudience"],
        //            expires: DateTime.Now.AddMinutes(20),
        //            claims: authClaims,
        //            signingCredentials: new SigningCredentials(authenKey,
        //                                SecurityAlgorithms.HmacSha256Signature)
        //    );
        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}

        //public async Task<IdentityResult> SignUpAsync(SignUpModel signUpModel)
        //{
        //    var user = new ApplicationUser
        //    {
        //        UserName = signUpModel.Username,
        //    };
        //    var result = await userManager.CreateAsync(user, signUpModel.Password);

        //    if (result.Succeeded)
        //    {
        //        if (!await roleManager.RoleExistsAsync(AppRole.Customer))
        //        {
        //            await roleManager.CreateAsync(new IdentityRole(AppRole.Customer));
        //        }

        //        await userManager.AddToRoleAsync(user, AppRole.Customer);
        //    }
        //    return result;
        //}

        private readonly AppDbContext _context;
        private readonly AppSetting _appSetting;
        private readonly IConfiguration configuration;

        public UserRepository(AppDbContext context, IOptionsMonitor<AppSetting> optionsMonitor
                                , IConfiguration configuration)
        {
            _context = context;
            _appSetting = optionsMonitor.CurrentValue;
            this.configuration = configuration;
        }

        public async Task<string> SignInAsync(SignInModel signInModel)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == signInModel.Email);
            if (user == null)
            {
                return string.Empty;
            }

            var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, signInModel.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, user.Role)
        };

            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(20),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha256Signature)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public async Task<bool> SignUpAsync(SignUpModel signUpModel)
        {
            var user = new User
            {
                Username = signUpModel.Username,
                Password = signUpModel.Password
            };

            _context.Add(user);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
