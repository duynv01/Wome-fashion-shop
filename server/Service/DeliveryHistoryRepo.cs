using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;

namespace server.Service
{
    public class DeliveryHistoryRepo : IDeliveryHistoryRepo
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public DeliveryHistoryRepo(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DeliveryHistoryDto>> GetAllDeliveryHistoriesAsync()
        {
            var deliveryHistories = await _context.DeliveryHistories
                .Select(dh => new DeliveryHistoryDto
                {
                    DeliveryHistoryId = dh.DeliveryHistoryId,
                    DeliveryInfoId = dh.DeliveryInfoId,
                    OrderId = dh.OrderId,
                    UserId = dh.UserId,
                    Status = ((DeliveryStatus)dh.Status).ToString() 
                })
                .ToListAsync();

            return deliveryHistories;
        }

        public async Task<DeliveryHistory?> GetDeliveryHistoryAsync(int id)
        {
            return await _context.DeliveryHistories!.SingleOrDefaultAsync(dh => dh.DeliveryHistoryId == id);
        }

        public async Task UpdateDeliveryStatusAsync(int deliveryHistoryId, DeliveryStatus newStatus)
        {
            var deliveryHistory = await _context.DeliveryHistories
            .FirstOrDefaultAsync(d => d.DeliveryHistoryId == deliveryHistoryId);

            if (deliveryHistory == null)
            {
                throw new Exception("Delivery history not found");
            }

            // Cập nhật trạng thái của DeliveryHistory
            deliveryHistory.Status = newStatus;

            var order = await _context.Orders
                .FirstOrDefaultAsync(o => o.OrderId == deliveryHistory.OrderId);

            if (order != null)
            {
                order.Status = newStatus; 
            }

            await _context.SaveChangesAsync();
        }
    }
}
