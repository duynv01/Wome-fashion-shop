using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;
using System.Drawing;
using System.Xml.Linq;

namespace server.Service
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(AppDbContext context, IProductRepository productRepository, 
                                IMapper mapper)
        {
            _context = context;
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<IActionResult> DeleteProductsAsync(int id)
        {
            try
            {
                Product product = await _productRepository.DeleteProductsAsync(id);
                if(product != null)
                {
                    return new OkObjectResult(new ProductViewModel
                    {
                        ProductId = product.ProductId,
                        Sku = product.Sku.Trim(),
                        Name = product.Name.Trim(),
                    });
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            catch
            {
                return new ConflictResult();
            }
        }

        public async Task<IActionResult> FindProductsAsync(string sku, decimal? from, decimal? to, string sortBy)
        {
            try
            {
                IEnumerable<Product> products = await _productRepository.FindProductsAsync(sku, from, to, sortBy);
                if (products != null)
                {
                    return new OkObjectResult(products.Select(p => new ProductViewModel()
                    {
                        ProductId = p.ProductId,
                        Sku = p.Sku.Trim(),
                        Name = p.Name.Trim(),
                        Price = p.Price
                    }));
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            catch
            {
                return new ConflictResult();
            }
        }

        public async Task<IActionResult> GetAllProductsAsync()
        {
            try
            {
                var products = await _productRepository.GetAllProductsAsync();

                if (products == null || !products.Any())
                {
                    return new NotFoundResult();
                }

                var productViewModels = _mapper.Map<IEnumerable<ProductViewModel>>(products);

                return new OkObjectResult(productViewModels);
            }
            catch
            {
                return new ConflictResult();
            }
        }

        public async Task<IActionResult> GetProductsAsync(int id)
        {
            try
            {
                Product product = await _productRepository.GetProductAsync(id);
                if (product != null)
                {
                    return new OkObjectResult(new ProductViewModel()
                    {
                        ProductId = product.ProductId,
                        Sku = product.Sku.Trim(),
                        Name = product.Name.Trim(),
                    });
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            catch
            {
                return new ConflictResult();
            }
        }

        public async Task<IActionResult> AddProductAsync(ProductViewModel productViewModel)
        {
            try
            {
                Product product = await _productRepository.AddProductAsync(productViewModel);
                if (product != null)
                {
                    return new OkObjectResult(new ProductViewModel()
                    {
                        ProductId = product.ProductId,
                        Sku = product.Sku.Trim(),
                        Name = product.Name.Trim(),
                    });
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            catch
            {
                return new ConflictResult();
            }
        }
    }
}
