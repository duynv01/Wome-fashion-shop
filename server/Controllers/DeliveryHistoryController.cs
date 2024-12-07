using Microsoft.AspNetCore.Mvc;
using server.Models.Entities;
using server.Service;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryHistoryController : ControllerBase
    {
        private readonly IDeliveryHistoryRepo _deliveryHistoryRepo ;

        public DeliveryHistoryController(IDeliveryHistoryRepo deliveryHistoryRepo)
        {
            _deliveryHistoryRepo = deliveryHistoryRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryHistory>>> GetAllDeliveryHistoriesAsync()
        {
            var deliveryHistories = await _deliveryHistoryRepo.GetAllDeliveryHistoriesAsync();
            return Ok(deliveryHistories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryHistory>> GetDeliveryHistoryAsync(int id)
        {
            var deliveryHistory = await _deliveryHistoryRepo.GetDeliveryHistoryAsync(id);

            if (deliveryHistory == null)
            {
                return NotFound();
            }

            return Ok(deliveryHistory);
        }

        [HttpPatch("update-status/{deliveryHistoryId}")]
        public async Task<ActionResult> UpdateDeliveryStatusAsync(int deliveryHistoryId, [FromBody] DeliveryStatus newStatus)
        {
            try
            {
                await _deliveryHistoryRepo.UpdateDeliveryStatusAsync(deliveryHistoryId, newStatus);
                return Ok("Status updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
