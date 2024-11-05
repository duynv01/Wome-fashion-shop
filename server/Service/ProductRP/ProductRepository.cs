using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace server.Service.ProductInterface
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProductRepository(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Product> AddProductAsync(ProductViewModel productViewModel)
        {
            var newProduct = _mapper.Map<Product>(productViewModel);
            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();

            return newProduct;
        }

        public async Task<Product> DeleteProductsAsync(int id)
        {
            Product product = await GetProductAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
            return product;
        }

        public async Task UpdateProductsAsync(int id, ProductViewModel productViewModel)
        {
            if (id == productViewModel.ProductId)
            {
                var updateProduct = _mapper.Map<Category>(productViewModel);
                _context.Categories.Update(updateProduct);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Product>> FindProductsAsync(string sku, decimal? from, decimal? to,
                                                                  string sortBy)
        {
            var product = _context.Products.AsQueryable();

            #region Filtering
            if (!string.IsNullOrEmpty(sku))
            {
                product = product.Where(p => p.Sku.Contains(sku));
            }

            if (from.HasValue)
            {
                product = product.Where(p => p.Price >= from);
            }
            if (to.HasValue)
            {
                product = product.Where(p => p.Price <= to);
            }
            #endregion

            #region Sorting
            product = product.OrderBy(p => p.Name);

            if (!string.IsNullOrEmpty(sortBy))
            {
                switch (sortBy)
                {
                    case "name_desc":
                        product = product.OrderByDescending(p => p.Name);
                        break;
                    case "price_asc":
                        product = product.OrderBy(p => p.Price);
                        break;
                    case "price_desc":
                        product = product.OrderByDescending(p => p.Price);
                        break;
                }
            }
            #endregion
            return await product.ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductAsync(int id)
        {
            return await _context.Products.Where(p => p.ProductId == id).FirstOrDefaultAsync();
        }
    }
}
