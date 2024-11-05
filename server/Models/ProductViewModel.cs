namespace server.Models
{
    public class ProductViewModel
    {
        public int ProductId { get; set; }
        public string Sku { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public int CategoryId { get; set; }
    }
}
