using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;
using server.Service.UserInterface;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly AppDbContext _context;

        public UserController(IUserService userService, AppDbContext context)
        {
            _userService = userService;
            _context = context;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                IEnumerable<User> users = await _userService.GetAllUsers();

                if (users == null)
                {
                    return NotFound("No users found.");
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                User? user = await _userService.GetUserById(id);

                if (user == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //[HttpGet("customers/count")]
        //public async Task<IActionResult> GetUserCountByRoleAsync([FromQuery] string fromDate,
        //                                                         [FromQuery] string toDate)
        //{
        //    try
        //    {
        //        DateTime startDate = DateTime.Parse(fromDate);
        //        DateTime endDate = DateTime.Parse(toDate);
        //        endDate = endDate.Date.AddDays(1).AddMilliseconds(-1);

        //        Console.WriteLine($"FromDate: {startDate}, ToDate: {endDate}");

        //        int count = await _userService.GetUserCountByRoleAsync(startDate, endDate);
        //        return Ok(new 
        //        { 
        //            Role = "User", 
        //            Count = count, 
        //            FromDate = startDate, 
        //            ToDate = endDate 
        //        });
        //    }
        //    catch (FormatException)
        //    {
        //        return BadRequest(new { message = "Invalid date format. Use yyyy-MM-dd." });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
        //    }
        //}

        [HttpPut("id")]
        public async Task<IActionResult> UpdateUserDto(int id, [FromBody] UpdateUserDto updateUserDto)
        {
            await _userService.UpdateUserDto(id, updateUserDto);
            return Ok();
        }
    }
}
