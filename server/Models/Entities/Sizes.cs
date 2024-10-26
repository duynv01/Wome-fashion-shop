namespace server.Models.Entities
{
    public class Sizes
    {
        public int SizeId { get; set; }
        public string Name { get; set; }

        public ICollection<ProductSize> ProductSizes { get; set; }
    }
}
