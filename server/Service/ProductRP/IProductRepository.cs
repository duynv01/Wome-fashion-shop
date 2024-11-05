using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Models.Entities;

namespace server.Service
{
    public interface IProductRepository
    {
        Task<Product> AddProductAsync(ProductViewModel productViewModel);
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductAsync(int id);
        Task<IEnumerable<Product>> FindProductsAsync(string sku, decimal? from, decimal? to, string sortBy);
        Task<Product> DeleteProductsAsync(int id);
        Task UpdateProductsAsync(int id, ProductViewModel productViewModel);
    }
}
