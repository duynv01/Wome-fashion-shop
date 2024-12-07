using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Models.Entities;
using server.Service;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizeController : ControllerBase
    {
        private readonly ISizeRepo _sizeRepo;

        public SizeController(ISizeRepo sizeRepo)
        {
            _sizeRepo = sizeRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sizes>>> GetAllSizes()
        {
            var sizes = await _sizeRepo.GetAllSizes();
            return Ok(sizes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Sizes>> GetSize(int id)
        {
            var size = await _sizeRepo.GetSizeById(id);

            if (size == null)
            {
                return NotFound();
            }

            return Ok(size);
        }

        //[HttpPost]
        //public ActionResult<Sizes> AddSize(SizeDto sizeDto)
        //{
        //    _sizeRepo.AddSize(sizeDto);
        //    return CreatedAtAction(nameof(GetSize), new { id = sizeDto.SizeId }, sizeDto);
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateSize(int id, [FromBody] SizeDto sizeDto)
        //{
        //    await _sizeRepo.UpdateSize(id, sizeDto);
        //    return Ok();
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteSize(int id)
        //{
        //    await _sizeRepo.DeleteSize(id);
        //    return Ok();
        //}
    }
}
