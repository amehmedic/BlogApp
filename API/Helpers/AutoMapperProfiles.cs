using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>().ForMember(dest => dest.ProfilePictureUrl, opt => opt.MapFrom(src=>src.ProfilePicture.Url));
            CreateMap<Photo, PhotoDto>();
        }
    }
}