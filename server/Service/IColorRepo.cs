using server.Models;
using server.Models.Entities;

namespace server.Service
{
    public interface IColorRepo
    {
        Task<List<Colors>> GetAllColor();
        Task<Colors?> GetColorById(int id);
        Task<int> AddColorAsync(ColorDto colorDto);
        Task DeleteColorAsync(int id);
        Task UpdateColorAsync(int id, ColorDto colorDto);
    }
}
