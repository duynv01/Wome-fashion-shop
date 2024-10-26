namespace server.Models.Entities
{
    public class Colors
    {
        public int ColorId { get; set; }
        public string Name { get; set; }

        public ICollection<ProductColor> ProductColors { get; set; }
    }
}
