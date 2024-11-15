using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Service;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryInfoController : ControllerBase
    {
        private IDeliveryInfoRepo _deliveryInfoRepo;

        public DeliveryInfoController(IDeliveryInfoRepo deliveryInfoRepo)
        {
            _deliveryInfoRepo = deliveryInfoRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDeliveryInfos()
        {
            try
            {
                var colors = await _deliveryInfoRepo.GetAllDeliveryInfos();
                return Ok(colors);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDeliveryInfoById(int id)
        {
            try
            {
                var color = await _deliveryInfoRepo.GetDeliveryInfoById(id);
                if (color == null)
                {
                    return NotFound();
                }
                return Ok(color);
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpPut("updateStatus")]
        public async Task<IActionResult> UpdateDeliveryInfo(int id, string newStatus)
        {
            await _deliveryInfoRepo.UpdateDeliveryInfo(id, newStatus);
            return Ok();
        }
    }
}
