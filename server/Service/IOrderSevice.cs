using server.Models.Entities;
using server.Models;

namespace server.Service
{
    public interface IOrderSevice
    {
        Task<Order> AddOrderWithDeliveryAsync(OrderDto orderDto, UpdateUserDto updateUserDto);
    }
}
