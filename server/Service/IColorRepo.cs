using server.Models.Entities;

namespace server.Service
{
    public interface IColorRepo
    {
        Task<List<Colors>> GetAllColor();
        Task<Colors?> GetColorById(int id);
    }
}
