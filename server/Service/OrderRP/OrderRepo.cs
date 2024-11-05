
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.Entities;

namespace server.Service.OrderInterface
{
    public class OrderRepo : IOrderRepo
    {
        private readonly AppDbContext _context;

        public OrderRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>>GetAllOrder()
        {
            return await _context.Orders
                    .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product).ToListAsync();
        }

        public async Task<Order?> GetOrderById(int id)
        {
            return await _context.Orders
                   .Include(o => o.OrderItems) 
                   .ThenInclude(oi => oi.Product) 
                   .FirstOrDefaultAsync(o => o.OrderId == id);
        }
    }
}
