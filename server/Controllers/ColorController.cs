using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Service;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly IColorRepo _colorRepo;
        private readonly IMapper _mapper;

        public ColorController(IColorRepo colorRepo, IMapper mapper)
        {
            _colorRepo = colorRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllColor()
        {
            try
            {
                var colors = await _colorRepo.GetAllColor();

                var colorDtos = _mapper.Map<List<ColorDto>>(colors);

                return Ok(colorDtos);
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

        [HttpPost("add")]
        public async Task<ActionResult> AddColorAsync(ColorDto colorDto)
        {
            try
            {
                var newColorId = await _colorRepo.AddColorAsync(colorDto);
                var color = await _colorRepo.GetColorById(newColorId);
                return color == null ? NotFound() : Ok(color);
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateColorAsync(int id, [FromBody] ColorDto colorDto)
        {
            await _colorRepo.UpdateColorAsync(id, colorDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColorAsync(int id)
        {
            await _colorRepo.DeleteColorAsync(id);
            return Ok();
        }
    }
}
