using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Stationary.Models;
using stationaryr.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace stationaryr.ViewModel
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ApplicationUser, UserViewModel>()
                   .ForMember(d => d.Roles, map => map.Ignore());
            CreateMap<UserViewModel, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore())
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<ApplicationUser, UserEditViewModel>()
                .ForMember(d => d.Roles, map => map.Ignore());
            CreateMap<UserEditViewModel, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore())
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));
            CreateMap<ApplicationRole, RoleViewModel>()
             .ForMember(d => d.Permissions, map => map.MapFrom(s => s.Claims))
             .ForMember(d => d.UsersCount, map => map.MapFrom(s => s.Users != null ? s.Users.Count : 0))
             .ReverseMap();
            CreateMap<RoleViewModel, ApplicationRole>()
                .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

            CreateMap<IdentityRoleClaim<string>, ClaimViewModel>()
               .ForMember(d => d.Type, map => map.MapFrom(s => s.ClaimType))
               .ForMember(d => d.Value, map => map.MapFrom(s => s.ClaimValue))
               .ReverseMap();
        }
        }
    }
