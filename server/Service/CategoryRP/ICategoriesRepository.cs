using server.Models;
using server.Models.Entities;

namespace server.Service.CategoryInterface
{
    public interface ICategoriesRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category?> GetCategoryAsync(int id);
        Task<int> AddCategoryAsync(CategoryDto categoryDto);
        Task UpdateCategory(int id, CategoryDto categoryDto);
        Task DeleteCategoriesAsync(int id);
    }
}
