using server.Models.Entities;

namespace server.Service.CategoryInterface
{
    public interface ICategoriesRepository
    {
        List<Category> GetAll();
        Category? GetById(int id);
        Category Add(Category category);
        void Update(Category category);
        void Delete(int id);

    }
}
