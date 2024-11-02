using server.Data;
using server.Models.Entities;

namespace server.Service.CategoryInterface
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly AppDbContext _context;

        public CategoriesRepository(AppDbContext context)
        {
            _context = context;
        }

        public Category Add(Category category)
        {
            var _category = new Category
            {
                Name = category.Name,
            };
            _context.Add(_category);
            _context.SaveChanges();
            return _category;
        }

        public void Delete(int id)
        {
            var category = _context.Products.FirstOrDefault(c => c.CategoryId == id);
            if (category != null)
            {
                _context.Remove(category);
                _context.SaveChanges();
            }
        }

        public List<Category> GetAll()
        {
            var categories = _context.Categories.Select(c => new Category
            {
                CategoryId = c.CategoryId,
                Name = c.Name,
            });
            return categories.ToList();
        }

        public Category? GetById(int id)
        {
            var category = _context.Categories.FirstOrDefault(p => p.CategoryId == id);
            if (category != null)
            {
                return category;
            }
            return null;
        }

        public void Update(Category category)
        {
            var _category = _context.Categories.FirstOrDefault(p => p.CategoryId == category.CategoryId);
            if (_category != null)
            {
                _category.Name = category.Name;
                _context.SaveChanges();
            }
        }
    }
}
