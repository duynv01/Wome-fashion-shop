using server.Models;
using server.Models.Entities;

namespace server.Service
{
    public interface IDeliveryInfoRepo
    {
        Task<IEnumerable<DeliveryInfo>> GetAllDeliveryInfosAsync();
        Task<DeliveryInfo?> GetDeliveryInfoAsync(int id);
    }
}
