using server.Models.Entities;

namespace server.Service
{
    public interface IProductRepository
    { 
        List<Product> GetAll();
        Product? GetById(int id);
        public Task<IEnumerable<Product>> GetSearch(string search);
        Product Add(Product product);
        void Update(Product product);
        void Delete(int id);
    }
}
