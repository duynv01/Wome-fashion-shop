using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Service;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly IColorRepo _colorRepo;

        public ColorController(IColorRepo colorRepo)
        {
            _colorRepo = colorRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllColor()
        {
            try
            {
                var colors = await _colorRepo.GetAllColor();
                return Ok(colors);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetColorById(int id)
        {
            try
            {
                var color = await _colorRepo.GetColorById(id);
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
    }
}
