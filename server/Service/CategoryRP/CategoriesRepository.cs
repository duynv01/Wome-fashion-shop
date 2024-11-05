using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;

namespace server.Service.CategoryInterface
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CategoriesRepository(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> AddCategoryAsync(CategoryDto categoryDto)
        {
            var newCategory = _mapper.Map<Category>(categoryDto);
            await _context.Categories.AddAsync(newCategory);
            await _context.SaveChangesAsync();

            return newCategory.CategoryId;
        }

        public async Task DeleteCategoriesAsync(int id)
        {
            var deleteCategory = _context.Categories!.SingleOrDefault(c => c.CategoryId == id);
            if (deleteCategory != null)
            {
                _context.Categories!.Remove(deleteCategory);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories!.ToListAsync();
        }

        public async Task<Category?> GetCategoryAsync(int id)
        {
            return await _context.Categories!.SingleOrDefaultAsync(c => c.CategoryId == id);
        }

        public async Task UpdateCategory(int id, CategoryDto categoryDto)
        {
            if (id == categoryDto.CategoryId)
            {
                var updateCategory = _mapper.Map<Category>(categoryDto);
                _context.Categories!.Update(updateCategory);
                await _context.SaveChangesAsync();
            }
        }
    }
}
