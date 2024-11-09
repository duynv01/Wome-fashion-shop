using server.Service;

namespace server.Models
{
    public class ColorDto
    {
        public int ColorId { get; set; }
        public string Name { get; set; }
        public List<ProductColorDto> ProductColors { get; set; }
    }
}
