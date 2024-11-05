using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;

namespace server.Service
{
    public class SizeRepo : ISizeRepo
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public SizeRepo(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> AddSize(SizeDto sizeDto)
        {
            var newSize = _mapper.Map<Sizes>(sizeDto);
            _context.Sizes!.Add(newSize);
            await _context.SaveChangesAsync();

            return newSize.SizeId;
        }   

        public async Task DeleteSize(int id)
        {
            var deleteSize = _context.Sizes!.SingleOrDefault(s => s.SizeId == id);
            if (deleteSize != null) 
            {
                _context.Sizes!.Remove(deleteSize);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Sizes>>GetAllSizes()
        {
            var sizes = await _context.Sizes
                        .Include(s => s.ProductSizes)
                        .ToListAsync();

            return _mapper.Map<List<Sizes>>(sizes);
        }

        public async Task<Sizes?> GetSizeById(int id)
        {
            var size = await _context.Sizes
                       .Include(s => s.ProductSizes)
                       .FirstOrDefaultAsync(s => s.SizeId == id);

            return _mapper?.Map<Sizes?>(size);
        }

        public async Task UpdateSize(int id, SizeDto sizeDto)
        {
            if(id == sizeDto.SizeId)
            {
                var updateSize = _mapper.Map<Sizes>(sizeDto);
                _context.Sizes!.Update(updateSize);
                await _context.SaveChangesAsync();
            }
        }
    }
}
