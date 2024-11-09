using server.Models;
using server.Models.Entities;

namespace server.Service
{
    public interface IImageRepo
    {
        Task<IEnumerable<Image>> GetAllImagesAsync();
        Task<Image?> GetImageAsync(int id);
        Task<int> AddImageAsync(ImageDto imageDto);
        Task UpdateImage(int id, ImageDto imageDto);
        Task DeleteImagesAsync(int id);
    }
}
