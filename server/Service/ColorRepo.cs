using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;

namespace server.Service
{
    public class ColorRepo : IColorRepo
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ColorRepo(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Colors>> GetAllColor()
        {
            var colors = await _context.Colors
                        .Include(c => c.ProductColors)
                        .ToListAsync();

            return _mapper.Map<List<Colors>>(colors);
        }

        public async Task<Colors?> GetColorById(int id)
        {
            var color = await _context.Colors
                       .Include(c => c.ProductColors)
                       .FirstOrDefaultAsync(c => c.ColorId == id);

            return _mapper?.Map<Colors?>(color);
        }
    }
}
