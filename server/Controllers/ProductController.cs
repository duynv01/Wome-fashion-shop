using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using server.Data;
using server.Models;
using server.Models.Entities;
using server.Service;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IWebHostEnvironment _env;
        private readonly AppDbContext _context;

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
        public IActionResult AddProduct([FromForm] ProductViewModel product)
        {
            var imageUrls = new List<ProductImage>();

            // Lưu các ảnh mới
            if (product.NewImages != null)
            {
                foreach (var image in product.NewImages)
                {
                    var imagePath = Path.Combine("wwwroot/images", image.FileName);
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        image.CopyTo(stream);
                    }

                    imageUrls.Add(new ProductImage
                    {
                        ImageUrl = $"/images/{image.FileName}"
                    });
                }
            }

            var newProduct = new Product
            {
                Sku = product.Sku,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                StockQuantity = product.StockQuantity,
                CategoryId = product.CategoryId,
                ProductImages = imageUrls
            };

            _context.Products.Add(newProduct);
            _context.SaveChanges();

            return Ok(new { message = "Thêm sản phẩm thành công", product = newProduct });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromForm] ProductViewModel product)
        {
            var existingProduct = _context.Products
                .Include(p => p.ProductImages)
                .FirstOrDefault(p => p.ProductId == id);

            if (existingProduct == null)
            {
                return NotFound(new { message = "Không thấy sản phẩm" });
            }

            // Cập nhật thông tin sản phẩm
            existingProduct.Sku = product.Sku;
            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.StockQuantity = product.StockQuantity;
            existingProduct.CategoryId = product.CategoryId;

            // Xóa ảnh cũ
            if (product.DeletedImageIds != null)
            {
                var imagesToDelete = existingProduct.ProductImages
                    .Where(pi => product.DeletedImageIds.Contains(pi.ProductImageId)).ToList();

                foreach (var image in imagesToDelete)
                {
                    var imagePath = Path.Combine("wwwroot", image.ImageUrl.TrimStart('/'));
                    if (System.IO.File.Exists(imagePath))
                        System.IO.File.Delete(imagePath);

                    existingProduct.ProductImages.Remove(image);
                }
            }
            if (product.NewImages != null)
            {
                foreach (var image in product.NewImages)
                {
                    var imagePath = Path.Combine("wwwroot/images", image.FileName);
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        image.CopyTo(stream);
                    }

                    existingProduct.ProductImages.Add(new ProductImage
                    {
                        ImageUrl = $"/images/{image.FileName}"
                    });
                }
            }
            _context.SaveChanges();
            return Ok(new { message = "Product updated successfully", product = existingProduct });
        }
    }
}
