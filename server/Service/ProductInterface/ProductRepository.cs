using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.Entities;

namespace server.Service.ProductInterface
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }
        public Product Add(Product product)
        {
            var _product = new Product
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                StockQuantity = product.StockQuantity,
            };
            _context.Add(_product);
            _context.SaveChanges();
            return _product;
        }

        public void Delete(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.ProductId == id);
            if (product != null)
            {
                _context.Remove(product);
                _context.SaveChanges();
            }
        }   

        public List<Product> GetAll()
        {
            var products = _context.Products.Select(p => new Product
            {
                ProductId= p.ProductId,
                Name= p.Name,
                Description = p.Description,
                Price = p.Price,
                StockQuantity = p.StockQuantity,
            });
            return products.ToList();
        }

        public Product? GetById(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.ProductId == id);
            if (product != null)
            {
                return product;
            }
            return null;
        }

        

        public void Update(Product product)
        {
            var _product = _context.Products.FirstOrDefault(p => p.ProductId == product.ProductId);
            if (_product != null)
            {
                _product.Name = product.Name;
                _product.Description = product.Description;
                _product.Price = product.Price;
                _product.StockQuantity = product.StockQuantity;
                _context.SaveChanges();
            }
        }

        public async Task<IEnumerable<Product>>GetSearch(string search)
        {
            var allProducts = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                // Tìm kiếm sản phẩm theo tên (không phân biệt hoa thường)
                allProducts = allProducts!.Where(pd => pd.Name.ToLower().Contains(search.ToLower()));
            }

            return await allProducts.ToListAsync();
        }
    }
}
