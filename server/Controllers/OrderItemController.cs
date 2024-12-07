using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Models.Entities;
using server.Models;
using server.Service.OrderItemRP;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private IOrderItemRepo _orderItemRepo;

        public OrderItemController(IOrderItemRepo orderItemRepo)
        {
            _orderItemRepo = orderItemRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetAllOrderItems()
        {
            var orderItems = await _orderItemRepo.GetAllOrderItems();
            return Ok(orderItems);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderItem>> GetOrderItemById(int id)
        {
            var orderItem = await _orderItemRepo.GetOrderItemById(id);

            if (orderItem == null)
            {
                return NotFound();
            }

            return Ok(orderItem);
        }

        [HttpPost("add-orderItem")]
        public async Task<ActionResult<Order>> AddOrderItemAsync([FromBody] OrderItemDto orderItemDto)
        {
            try
            {
                var newOrderItemId = await _orderItemRepo.AddOrderItemAsync(orderItemDto);
                var orderItem = await _orderItemRepo.GetOrderItemById(newOrderItemId);
                return orderItem == null ? NotFound() : Ok(orderItem);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderItem(int id, [FromBody] OrderItemDto orderItemDto)
        {
            await _orderItemRepo.UpdateOrderItem(id, orderItemDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderItem(int id)
        {
            await _orderItemRepo.DeleteOrderItem(id);
            return Ok();
        }
    }
}
