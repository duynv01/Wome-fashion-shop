using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models.Entities;
using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Migrations;
using server.Service.UserInterface;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        //[HttpGet]
        //public IActionResult GetAllUsers() 
        //{
        //    try
        //    {
        //        return Ok(_userRepository.GetAllUsers());
        //    }
        //    catch
        //    {
        //        return BadRequest();
        //    }
        //}

        //[HttpGet("{id}")]
        //public IActionResult GetUserById(int id) 
        //{ 
        //    var user = _userRepository.GetUserById(id);
        //    return user == null ? NotFound() : Ok(user);
        //}

        //[HttpPost]
        //public IActionResult AddUser(User user)
        //{
        //    var addUser = _userRepository.AddUser(user);
        //    return CreatedAtAction(nameof(GetUserById), new { id = addUser.UserId }, addUser);
        //}

        //[HttpPut("{id}")]
        //public IActionResult UpdateUser(int id, User user) 
        //{
        //    var updatedUser = _userRepository.UpdateUser(id, user);
        //    if (updatedUser == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(updatedUser);
        //}

        //[HttpDelete("{id}")]
        //public IActionResult DeleteUser(int id) 
        //{
        //    if (!_userRepository.DeleteUser(id))
        //    {
        //        return NotFound();
        //    }
        //    return NoContent();
        //}

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(SignUpModel signUpModel)
        {
            var result = await _userRepository.SignUpAsync(signUpModel);
            if (result)
            {
                return Ok(result);
            }
            return Unauthorized();
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIp(SignInModel signInModel)
        {
            var result = await _userRepository.SignInAsync(signInModel);
            if (string.IsNullOrEmpty(result))
            {
                return Unauthorized();
            }
            return Ok(result);
        }

    }
}
