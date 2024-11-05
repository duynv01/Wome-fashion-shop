using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Models.Entities;
using System.Drawing;

namespace server.Service
{
    public interface IProductService
    {
        Task<IActionResult> GetAllProductsAsync();
        Task<IActionResult> GetProductsAsync(int id);
        Task<IActionResult> FindProductsAsync(string sku, decimal? from, decimal? to, string sortBy);
        Task<IActionResult> DeleteProductsAsync(int id);
        Task<IActionResult> AddProductAsync(ProductViewModel productViewModel);
    }
}
