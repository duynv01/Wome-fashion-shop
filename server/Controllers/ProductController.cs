using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;
using server.Service.ProductInterface;
using server.Service;
using System.Reflection;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IProductRepository _productRepository;

        public ProductController(IProductService productService, IProductRepository productRepository)
        {
            _productService = productService;
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProductsAsync()
        {
            return await _productService.GetAllProductsAsync();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductAsync(int id)
        {
            return await _productService.GetProductsAsync(id);
        }

        [HttpGet("find/{sku}")]
        public async Task<IActionResult> FindProductsAsync(string sku, decimal? from, decimal? to, string sortBy)
        {
            return await _productService.FindProductsAsync(sku, from, to, sortBy);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductAsync(int id)
        {
            return await _productService.DeleteProductsAsync(id);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddProductAsync([FromBody] ProductViewModel productViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _productService.AddProductAsync(productViewModel);
                return result;
            }
            catch
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductsAsync(int id, [FromBody] ProductViewModel productViewModel)
        {
            await _productRepository.UpdateProductsAsync(id, productViewModel);
            return Ok(productViewModel);
        }
    }
}
