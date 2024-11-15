using server.Models;
using server.Models.Entities;

namespace server.Service
{
    public interface IDeliveryInfoRepo
    {
        Task<List<DeliveryInfo>> GetAllDeliveryInfos();
        Task<DeliveryInfo?> GetDeliveryInfoById(int id);
        Task UpdateDeliveryInfo (int id, string newStatus);
    }
}
