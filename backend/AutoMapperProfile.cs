using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, GetUserDto>();
            CreateMap<AddUserDto, User>();
            CreateMap<UpdateUserDto, User>();

            CreateMap<Post, GetPostDto>();
            CreateMap<GetPostDto, Post>();
            CreateMap<UpdatePostDto, Post>();

        }
    }
}