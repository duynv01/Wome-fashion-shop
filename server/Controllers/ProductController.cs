using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.Entities;
using server.Service;
using server.Service.ProductInterface;
using System.Reflection;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var result = _productRepository.GetAll();
                return Ok(result);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("{search}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetSearch(string search)
        {
            try
            {
                var result = await _productRepository.GetSearch(search);

                if (result.Any())
                {
                    return Ok(result);
                }

                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var data = _productRepository.GetById(id);
                if (data != null)
                {
                    return Ok(data);
                }
                else
                {
                    return NotFound();
                }
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Add(Product product)
        {
            try
            {
                return Ok(_productRepository.Add(product));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Product product)
        {
            if(id != product.ProductId)
            {
                return BadRequest();
            }
            try
            {
                _productRepository.Update(product);
                return NoContent();
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _productRepository.Delete(id);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
