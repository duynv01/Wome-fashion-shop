using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Models.Entities;
using server.Service.OrderInterface;
using server.Service.UserInterface;
using AutoMapper;
using server.Data;
using Microsoft.AspNetCore.Mvc;

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
            if(user.Address == null || user.Phone == null)
            {
                throw new Exception("Please update the Infomation!");
            }
            _mapper.Map<User>(updateUserDto);

            var order = new Order
            {
                UserId = orderDto.UserId,
                OrderCode = Guid.NewGuid().ToString().Substring(0, 8),
                OrderDate = DateTime.Now,
                CreatedAt = DateTime.UtcNow,
                TotalAmount = orderDto.Amount,
                Status = orderDto.Status,
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            var deliveryInfo = new DeliveryInfo
            {
                OrderId = order.OrderId,
                Email = user.Email, 
                Address = updateUserDto.Address,
                Phone = updateUserDto.Phone,       
                ReceiverName = user.Username,
            };

            await _context.DeliveryInfos.AddAsync(deliveryInfo);
            await _context.SaveChangesAsync();
            return order;
        }
    }
}
