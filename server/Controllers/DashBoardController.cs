using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Service.OrderInterface;
using server.Service.UserInterface;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashBoardController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IOrderRepo _orderRepo;

        public DashBoardController(IUserService userService, IOrderRepo orderRepo)
        {
            _userService = userService;
            _orderRepo = orderRepo;
        }

        [HttpGet("statics")]
        public async Task<IActionResult> GetRevenuaStatics(string fromDate, string toDate)
        {
            if (!DateTime.TryParse(fromDate, out DateTime startDate) || !DateTime.TryParse(toDate, out DateTime endDate))
            {
                return BadRequest("Invalid date format. Please use a valid date format like 'yyyy-MM-dd'.");
            }
            endDate = endDate.Date.AddDays(1).AddTicks(-1);
            var revenueData = await _orderRepo.GetRevenuaStatics(startDate, endDate);

            return Ok(revenueData);
        }

        [HttpGet("customers/count")]
        public async Task<IActionResult> GetUserCountByRoleAsync([FromQuery] string fromDate,
                                                                 [FromQuery] string toDate)
        {
            try
            {
                DateTime startDate = DateTime.Parse(fromDate);
                DateTime endDate = DateTime.Parse(toDate);
                endDate = endDate.Date.AddDays(1).AddMilliseconds(-1);

                Console.WriteLine($"FromDate: {startDate}, ToDate: {endDate}");

                int count = await _userService.GetUserCountByRoleAsync(startDate, endDate);
                return Ok(new
                {
                    Role = "User",
                    Count = count,
                    FromDate = startDate,
                    ToDate = endDate
                });
            }
            catch (FormatException)
            {
                return BadRequest(new { message = "Invalid date format. Use yyyy-MM-dd." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
            }
        }
    }
}
