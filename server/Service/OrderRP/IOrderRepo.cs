using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Models.Entities;

namespace server.Service.OrderInterface
{
    public interface IOrderRepo
    {
        Task<IEnumerable<Order>> GetAllOrder();
        Task<Order?> GetOrderById(int id);
        Task<IEnumerable<RevenuaStaticViewModel>> GetRevenuaStatics(DateTime fromDate, DateTime toDate);
    }
}
