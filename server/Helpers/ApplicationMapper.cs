using AutoMapper;
using server.Models;
using server.Models.Entities;
using server.Service;

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
            CreateMap<Image, ImageDto>().ReverseMap();
        }
    }
}
