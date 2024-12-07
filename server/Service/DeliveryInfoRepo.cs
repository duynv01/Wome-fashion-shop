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

        public async Task<IEnumerable<DeliveryInfo>> GetAllDeliveryInfosAsync()
        {
            return await _context.DeliveryInfos!.ToListAsync();
        }

        public async Task<DeliveryInfo?> GetDeliveryInfoAsync(int id)
        {
            return await _context.DeliveryInfos!.SingleOrDefaultAsync(di => di.DeliveryInfoId == id);
        }
    }
}
