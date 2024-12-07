using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;

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

        public async Task<int> AddProductAsync(ProductViewModel productViewModel)
        {
            var newProduct = _mapper.Map<Product>(productViewModel);
            newProduct.Sku = GenerateSku(productViewModel);
            newProduct.Category = null; //không thêm mới thực thể

            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();

            // Thêm Color vào bảng ProductColor
            if (productViewModel.ColorId.HasValue) 
            {
                var productColor = new ProductColor
                {
                    ProductId = newProduct.ProductId,
                    ColorId = productViewModel.ColorId.Value
                };
                _context.ProductColors.Add(productColor);
            }

            // Thêm Size vào bảng ProductSize
            if (productViewModel.SizeId.HasValue)
            {
                var productSize = new ProductSize
                {
                    ProductId = newProduct.ProductId,
                    SizeId = productViewModel.SizeId.Value
                };
                _context.ProductSizes.Add(productSize);
            }

            await _context.SaveChangesAsync();
            return newProduct.ProductId;
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
                var updateProduct = _mapper.Map<Product>(productViewModel);
                _context.Products.Update(updateProduct);
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

        public async Task<List<ProductViewModel>> GetAllProductsAsync()
        {
            var products = await _context.Products
                            .Include(p => p.ProductColors)
                            .ThenInclude(pc => pc.Color)  
                            .Include(p => p.ProductSizes) 
                            .ThenInclude(ps => ps.Size)
                            .Include(p => p.Category)
                            .ToListAsync();

            var productViewModels = products.Select(p => new ProductViewModel
            {
                ProductId = p.ProductId,
                Sku = p.Sku,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                StockQuantity = p.StockQuantity,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                ColorId = p.ProductColors.FirstOrDefault()?.ColorId, 
                ColorName = p.ProductColors.FirstOrDefault()?.Color.Name, 
                SizeId = p.ProductSizes.FirstOrDefault()?.SizeId,   
                SizeName = p.ProductSizes.FirstOrDefault()?.Size.Name 
            }).ToList();

            return productViewModels;
        }

        public async Task<Product?> GetProductAsync(int id)
        {
            return await _context.Products!.SingleOrDefaultAsync(p => p.ProductId == id);
        }

        public string GenerateSku(ProductViewModel productViewModel)
        {
            // Mã sản phẩm cố định
            string productCode = productViewModel.Name.Substring(0, 2).ToUpper(); 

            // Mã màu dựa trên ColorId
            string colorCode = GetColorCode(productViewModel.ColorId);  

            // Mã kích thước dựa trên SizeId
            string sizeCode = GetSizeCode(productViewModel.SizeId);  

            // Tạo mã ngẫu nhiên (Ví dụ: 4 ký tự ngẫu nhiên)
            string randomCode = GenerateRandomCode();

            // Ghép thành mã SKU
            string sku = $"{productCode}-{colorCode}-{sizeCode}-{randomCode}";

            return sku;
        }

        private string GetColorCode(int? colorId)
        {
            var colorDictionary = new Dictionary<int, string>
            {
                { 1, "BL" },  // Black
                { 2, "WT" },  // White
                { 3, "BR" }   // Brown
            };

            return colorId.HasValue && colorDictionary.ContainsKey(colorId.Value) ? colorDictionary[colorId.Value] : "XX"; // Default là "XX"
        }

        private string GetSizeCode(int? sizeId)
        {
            var sizeDictionary = new Dictionary<int, string>
            {
                { 1, "S" },  // Small
                { 2, "M" },  // Medium
                { 3, "L" },   // Large
            };

            return sizeId.HasValue && sizeDictionary.ContainsKey(sizeId.Value) ? sizeDictionary[sizeId.Value] : "XX"; // Default là "XX"
        }

        private string GenerateRandomCode()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Range(0, 4).Select(_ => chars[random.Next(chars.Length)]).ToArray());
        }
    }
}
