using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Service;
using server.Service.OrderInterface;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepo _orderRepo;

        public OrderController(IOrderRepo orderRepo)
        {
            _orderRepo = orderRepo;
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
    }
}
