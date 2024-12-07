
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;

namespace server.Service.OrderInterface
{
    public class OrderRepo : IOrderRepo
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public OrderRepo(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Order> AddOrderAsync(OrderDto orderDto)
        {
            var newOrder = _mapper.Map<Order>(orderDto);
            await _context.Orders.AddAsync(newOrder);
            await _context.SaveChangesAsync();

            return newOrder;
        }

        public async Task<IEnumerable<Order>>GetAllOrder()
        {
            return await _context.Orders
                    .Include(o => o.User)
                    .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                    .ToListAsync();
        }

        public async Task<Order?> GetOrderById(int id)
        {
            return await _context.Orders
                   .Include(o => o.OrderItems) 
                   .ThenInclude(oi => oi.Product) 
                   .FirstOrDefaultAsync(o => o.OrderId == id);
        }

        public async Task<IEnumerable<RevenuaStaticViewModel>> GetRevenuaStatics(DateTime fromDate, DateTime toDate)
        {
            return await _context.Orders
                    .Where(o => o.Status == DeliveryStatus.DaGui 
                           && o.CreatedAt >= fromDate && o.CreatedAt <= toDate)
                    .GroupBy(o => o.CreatedAt.Date)
                    .Select(g => new RevenuaStaticViewModel
                    {
                        Date = g.Key,
                        Revenue = g.Sum(o => o.TotalPrice)
                    })
                    .ToListAsync();
        }
    }
}
