using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;
using server.Service;
using server.Service.OrderInterface;
using server.Service.UserInterface;
using System.Security.Claims;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepo _orderRepo;
        private readonly IOrderSevice _orderSevice;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public OrderController(IOrderRepo orderRepo, IOrderSevice orderSevice,
                                IUserService userService, IMapper mapper)
        {
            _orderRepo = orderRepo;
            _orderSevice = orderSevice;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrder()
        {
            try
            {
                var orders = await _orderRepo.GetAllOrder();
                return Ok(orders);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            try
            {
                var order = await _orderRepo.GetOrderById(id);
                if (order == null)
                {
                    return NotFound();
                }
                return Ok(order);
            }
            catch
            {
                return BadRequest();
            }
            
        }

        [HttpPost("add-order")]
        public async Task<ActionResult<Order>> AddOrderWithDeliveryAsync([FromBody] OrderDto orderDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userService.GetUserById(orderDto.UserId);
            var updateUserDto = _mapper.Map<UpdateUserDto>(user);

            var order = await _orderSevice.AddOrderWithDeliveryAsync(orderDto, updateUserDto);

            return CreatedAtAction(nameof(GetOrderById), new { id = order.OrderId }, order);         
        }
    }
}
