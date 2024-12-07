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
            var colors = await _context.Colors.ToListAsync();
            return _mapper.Map<List<Colors>>(colors);
        }

        public async Task<Colors?> GetColorById(int id)
        {
            var color = await _context.Colors.FirstOrDefaultAsync(c => c.ColorId == id);
            return _mapper?.Map<Colors?>(color);
        }

        //public async Task<int> AddColorAsync(ColorDto colorDto)
        //{
        //    var newColor = _mapper.Map<Colors>(colorDto);
        //    await _context.Colors.AddAsync(newColor);
        //    await _context.SaveChangesAsync();

        //    return newColor.ColorId;
        //}

        //public async Task DeleteColorAsync(int id)
        //{
        //    var deleteColor = _context.Colors!.SingleOrDefault(c => c.ColorId == id);
        //    if (deleteColor != null)
        //    {
        //        _context.Colors!.Remove(deleteColor);
        //        await _context.SaveChangesAsync();
        //    }
        //}

        //public async Task UpdateColorAsync(int id, ColorDto colorDto)
        //{
        //    if (id == colorDto.ColorId)
        //    {
        //        var updateColor = _mapper.Map<Colors>(colorDto);
        //        _context.Colors!.Update(updateColor);
        //        await _context.SaveChangesAsync();
        //    }
        //}
    }
}
