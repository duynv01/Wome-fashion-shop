using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Utilities;
using server.Data;
using server.Models;
using server.Models.Entities;

namespace server.Service.OrderItemRP
{
    public class OrderItemRepo : IOrderItemRepo
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public OrderItemRepo(AppDbContext context, IMapper mapper) 
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task DeleteOrderItem(int id)
        {
            var deleteOrderItem = _context.OrderItems!.SingleOrDefault(oi => oi.OrderItemId == id);
            if (deleteOrderItem != null)
            {
                _context.OrderItems!.Remove(deleteOrderItem);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<OrderItem>> GetAllOrderItems()
        {
            return await _context.OrderItems!.ToListAsync();
        }

        public async Task<OrderItem?> GetOrderItemById(int id)
        {
            return await _context.OrderItems!.SingleOrDefaultAsync(oi => oi.OrderItemId == id);
        }

        public async Task UpdateOrderItem(int id, OrderItemDto orderItemDto)
        {
            if (id == orderItemDto.OrderId)
            {
                var updateOrderItem = _mapper.Map<OrderItem>(orderItemDto);
                _context.OrderItems!.Update(updateOrderItem);
                await _context.SaveChangesAsync();
            }
        }
    }
}
