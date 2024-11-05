using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;

namespace server.Service
{
    public class ImageRepo : IImageRepo
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ImageRepo(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> AddImageAsync(ImageDto imageDto)
        {
            var newImage = _mapper.Map<Image>(imageDto);
            await _context.Images.AddAsync(newImage);
            await _context.SaveChangesAsync();

            return newImage.ImageId;
        }

        public async Task DeleteImagesAsync(int id)
        {
            var deleteImage = _context.Images!.SingleOrDefault(i => i.ImageId == id);
            if (deleteImage != null)
            {
                _context.Images!.Remove(deleteImage);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Image>> GetAllImagesAsync()
        {
            return await _context.Images!.ToListAsync();
        }

        public async Task<Image?> GetImageAsync(int id)
        {
            return await _context.Images!.SingleOrDefaultAsync(i => i.ImageId == id);
        }

        public async Task UpdateImage(int id, ImageDto imageDto)
        {
            if (id == imageDto.ImageId)
            {
                var updateImage = _mapper.Map<Image>(imageDto);
                _context.Images!.Update(updateImage);
                await _context.SaveChangesAsync();
            }
        }
    }
}
