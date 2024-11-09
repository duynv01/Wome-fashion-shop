using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Models.Entities;
using server.Service.CategoryInterface;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly IMapper _mapper;

        public CategoryController(ICategoriesRepository categoriesRepository, IMapper mapper)
        {
            _categoriesRepository = categoriesRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategoriesAsync()
        {
            var categories = await _categoriesRepository.GetAllCategoriesAsync();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategoryAsync(int id)
        {
            var category = await _categoriesRepository.GetCategoryAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddCategoryAsync(CategoryDto categoryDto)
        {
            try
            {
                var newCategoryId = await _categoriesRepository.AddCategoryAsync(categoryDto);
                var category = await _categoriesRepository.GetCategoryAsync(newCategoryId);
                return category == null ? NotFound() : Ok(category);
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryDto categoryDto)
        {
            await _categoriesRepository.UpdateCategory(id, categoryDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoriesAsync(int id)
        {
            await _categoriesRepository.DeleteCategoriesAsync(id);
            return Ok();
        }
    }
}
