using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using server.Models;
using server.Service;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IWebHostEnvironment _env;

        public ProductController(IProductRepository productRepository, IWebHostEnvironment env)
        {
            _productRepository = productRepository;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProductsAsync()
        {
            var products = await _productRepository.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductAsync(int id)
        {
            var product = await _productRepository.GetProductAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpGet("find/{sku}")]
        public async Task<IActionResult> FindProductsAsync(string sku, decimal? from, decimal? to, string sortBy)
        {
            var findProduct = await _productRepository.FindProductsAsync(sku, from, to, sortBy);
            return Ok(findProduct); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductAsync(int id)
        {
            await _productRepository.DeleteProductsAsync(id);
            return Ok();
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddProductAsync(ProductViewModel productViewModel)
        {
            if (productViewModel == null || string.IsNullOrEmpty(productViewModel.Name) || productViewModel.Price <= 0)
            {
                return BadRequest("Invalid product data. Name and price are required.");
            }

            try
            {
                var newProductId = await _productRepository.AddProductAsync(productViewModel);
                var product = await _productRepository.GetProductAsync(newProductId);

                if (product == null)
                {
                    return NotFound("Product not found after creation.");
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage([FromBody] ImageUploadRequest request)
        {
            if (string.IsNullOrEmpty(request.ImageBase64))
            {
                return BadRequest("No image data provided.");
            }

            try
            {
                // Chuyển đổi base64 thành byte[]
                var imageBytes = Convert.FromBase64String(request.ImageBase64);

                var fileName = Guid.NewGuid().ToString() + ".jpg";

                // Lưu ảnh vào thư mục uploads
                var filePath = Path.Combine(_env.WebRootPath, "uploads", fileName);
                await System.IO.File.WriteAllBytesAsync(filePath, imageBytes);

                // Trả về đường dẫn ảnh
                var imageUrl = "/uploads/" + fileName;
                return Ok(new { imageUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        public class ImageUploadRequest
        {
            public string ImageBase64 { get; set; }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductsAsync(int id, [FromBody] ProductViewModel productViewModel)
        {
            await _productRepository.UpdateProductsAsync(id, productViewModel);
            return Ok(productViewModel);
        }
    }
}
