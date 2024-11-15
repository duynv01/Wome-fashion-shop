using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;
using System.Drawing;

namespace server.Service
{
    public class DeliveryInfoRepo : IDeliveryInfoRepo
    {
        private AppDbContext _context;
        private IMapper _mapper;

        public DeliveryInfoRepo(AppDbContext context, IMapper mapper) 
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<DeliveryInfo>> GetAllDeliveryInfos()
        {
            var deliveryInfos = await _context.DeliveryInfos
                       .Include(di => di.Order)
                       .ToListAsync();

            return _mapper.Map<List<DeliveryInfo>>(deliveryInfos);
        }

        public async Task<DeliveryInfo?> GetDeliveryInfoById(int id)
        {
            var deliveryInfos = await _context.DeliveryInfos
                       .Include(di => di.Order)
                       .FirstOrDefaultAsync(di => di.DeliveryInfoId == id);

            return _mapper?.Map<DeliveryInfo?>(deliveryInfos);
        }

        public async Task UpdateDeliveryInfo(int id, string newStatus)
        {
            var deliveryInfo = await _context.DeliveryInfos
                                     .FirstOrDefaultAsync(d => d.DeliveryInfoId == id);

            if (deliveryInfo != null)
            {
                // Cập nhật status của DeliveryInfo
                deliveryInfo.Status = newStatus;

                // Cập nhật status của Order tương ứng
                var order = await _context.Orders
                    .FirstOrDefaultAsync(o => o.OrderId == deliveryInfo.OrderId);

                if (order != null)
                {
                    // Cập nhật status của Order
                    order.Status = newStatus;
                }

                // Lưu thay đổi vào cơ sở dữ liệu
                await _context.SaveChangesAsync();
            }
        }
    }
}
