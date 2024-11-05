using server.Models;
using server.Models.Entities;

namespace server.Service
{
    public interface ISizeRepo
    {
        Task<IEnumerable<Sizes>> GetAllSizes();
        Task<Sizes?> GetSizeById(int id);
        Task<int> AddSize(SizeDto sizeDto);
        Task UpdateSize(int id, SizeDto sizeDto);
        Task DeleteSize(int id);
    }
}
