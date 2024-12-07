using server.Models;
using server.Models.Entities;

namespace server.Service
{
    public interface IDeliveryHistoryRepo
    {
        Task<IEnumerable<DeliveryHistoryDto>> GetAllDeliveryHistoriesAsync();
        Task<DeliveryHistory?> GetDeliveryHistoryAsync(int id);
        Task UpdateDeliveryStatusAsync(int deliveryHistoryId, DeliveryStatus newStatus);
    }
}
