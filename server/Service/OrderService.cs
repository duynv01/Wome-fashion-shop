using server.Models;
using server.Models.Entities;
using AutoMapper;
using server.Data;
using Microsoft.EntityFrameworkCore;

namespace server.Service
{
    public class OrderService : IOrderSevice
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public OrderService(AppDbContext context,
                            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Order> AddOrderWithDeliveryAsync(OrderDto orderDto, UpdateUserDto updateUserDto)
        {
            var user = await _context.Users.FindAsync(orderDto.UserId);

            if (user == null)
            {
                throw new Exception("User not found.");
            }
            if (user.Address == null || user.Phone == null)
            {
                throw new Exception("Please update the Infomation!");
            }
            _mapper.Map<User>(updateUserDto);

            var order = new Order
            {
                UserId = orderDto.UserId,
                OrderDate = DateTime.Now,
                CreatedAt = DateTime.UtcNow,
                TotalAmount = 0,
                Status = DeliveryStatus.DangXacNhan
            };
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            var deliveryInfo = new DeliveryInfo
            {
                Email = user.Email, 
                Address = updateUserDto.Address,
                Phone = updateUserDto.Phone,       
                ReceiverName = user.Username,
            };

            await _context.DeliveryInfos.AddAsync(deliveryInfo);
            await _context.SaveChangesAsync();

            var deliveryHistory = new DeliveryHistory
            {
                OrderId = order.OrderId,
                UserId = user.UserId,
                DeliveryInfoId = deliveryInfo.DeliveryInfoId,
                Status = DeliveryStatus.DangXacNhan,
            };

            await _context.DeliveryHistories.AddAsync(deliveryHistory);
            await _context.SaveChangesAsync();
            return order;
        }
    }
}
