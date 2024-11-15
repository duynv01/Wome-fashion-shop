using server.Models;
using server.Models.Entities;

namespace server.Service.OrderItemRP
{
    public interface IOrderItemRepo
    {
        Task<IEnumerable<OrderItem>> GetAllOrderItems();
        Task<OrderItem?> GetOrderItemById(int id);
        Task UpdateOrderItem(int id, OrderItemDto orderItemDto);
        Task DeleteOrderItem(int id);
    }
}
