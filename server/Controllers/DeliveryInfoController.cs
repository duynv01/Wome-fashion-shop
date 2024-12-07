using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Models.Entities;
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
        public async Task<ActionResult<IEnumerable<DeliveryInfo>>> GetAllDeliveryInfosAsync()
        {
            var deliveryInfos = await _deliveryInfoRepo.GetAllDeliveryInfosAsync();
            return Ok(deliveryInfos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryInfo>> GetDeliveryHistoryAsync(int id)
        {
            var deliveryInfo = await _deliveryInfoRepo.GetDeliveryInfoAsync(id);

            if (deliveryInfo == null)
            {
                return NotFound();
            }

            return Ok(deliveryInfo);
        }


    }
}
