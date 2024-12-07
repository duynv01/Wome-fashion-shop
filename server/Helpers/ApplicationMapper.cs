using AutoMapper;
using server.Models;
using server.Models.Entities;

namespace server.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper() 
        {
            CreateMap<Product, ProductViewModel>().ReverseMap();
            CreateMap<Colors, ColorDto>().ReverseMap();
            CreateMap<ProductColor, ProductColorDto>().ReverseMap();
            CreateMap<Sizes, SizeDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<DeliveryInfo, RevenuaStaticViewModel>().ReverseMap();
            CreateMap<Image, ImageDto>().ReverseMap();

            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<DeliveryHistory, DeliveryHistoryDto>().ReverseMap();
            CreateMap<OrderItem, OrderItemDto>().ReverseMap();
            CreateMap<User, UpdateUserDto>().ReverseMap();
        }
    }
}
