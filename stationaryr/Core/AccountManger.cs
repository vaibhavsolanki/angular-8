using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Stationary.Models;
using stationaryr.Core.Interface;
using stationaryr.Models;
using stationaryr.ViewModel;
using AutoMapper;
namespace stationaryr.Core
{
    public class AccountManager:IAccountManager
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IMapper _mapper;

        public AccountManager(UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager, IMapper mapper)
        {
            
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
        }

        public async Task<(bool Succeeded, string[] Errors)> CreateUserAsync(ApplicationUser user, IEnumerable<string> roles,string password)
        {
            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
                return (false, result.Errors.Select(e => e.Description).ToArray());

            user = await _userManager.FindByNameAsync(user.UserName);

            foreach (var role in roles)
            {
                result = await this._userManager.AddToRoleAsync(user, role);
            }
          
            return (true, new string[] { });
        }

        public Task<List<ApplicationRole>> GetRolesLoadRelatedAsync(int page, int pageSize)
        {
            List<ApplicationRole> rr= new Data().GetRoles();
          var role=  Task.Run(() => new List<ApplicationRole>(rr));
            return role;
         //   throw new NotImplementedException();
        }

        public async Task<ApplicationUser> GetUserByIdAsync(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }

        public Task<ApplicationUser> GetUserByUserNameAsync(string userName)
        {
            throw new NotImplementedException();
        }
      
       

        public async Task<ApplicationRole> GetRoleByIdAsync(string roleId)
        {
            return await _roleManager.FindByIdAsync(roleId);
        }


        public async Task<ApplicationRole> GetRoleByNameAsync(string roleName)
        {
            return await _roleManager.FindByNameAsync(roleName);
        }

        public  async Task<ApplicationRole> GetRoleLoadRelatedAsync(string roleName)
        {
            ApplicationRole app= new Data().GetRoles().Where(r => r.Name == roleName).SingleOrDefault();
            var role = await Task.Run(() =>app);
            return role;
            
           
        }

        public async Task<(bool Succeeded, string[] Errors)> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims)
        {
            var result = await _roleManager.CreateAsync(role);

            if (!result.Succeeded)
                return (false, result.Errors.Select(e => e.Description).ToArray());
            role = await _roleManager.FindByNameAsync(role.Name);

            foreach (string claim in claims.Distinct())
            {
                result = await this._roleManager.AddClaimAsync(role, new Claim(ClaimConstants.Permission, ApplicationPermissions.GetPermissionByValue(claim)));

                if (!result.Succeeded)
                {
                    await DeleteRoleAsync(role);
                    return (false, result.Errors.Select(e => e.Description).ToArray());
                }
            }
            return (true, new string[] { });
        }

        public async Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(ApplicationRole role)
        {
            var result = await _roleManager.DeleteAsync(role);
            return (result.Succeeded, result.Errors.Select(e => e.Description).ToArray());

        }

        public async Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);

            if (role != null)
                return await DeleteRoleAsync(role);

            return (true, new string[] { });
           
        }

        public async Task<(bool Succeeded, string[] Errors)> UpdateRoleAsync(ApplicationRole role, IEnumerable<string> claims)
        {
            var result = await _roleManager.UpdateAsync(role);
            if (!result.Succeeded)
                return (false, result.Errors.Select(e => e.Description).ToArray());
            return (true, new string[] { });
        }

        public async Task<IList<string>> GetUserRolesAsync(ApplicationUser user)
        {
            return await _userManager.GetRolesAsync(user);


        }

        public async Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(ApplicationUser user)
        {
            var result = await _userManager.DeleteAsync(user);
            return (result.Succeeded, result.Errors.Select(e => e.Description).ToArray());

        }

        public async Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user != null)
                return await DeleteUserAsync(user);

            return (true, new string[] { });
        }

      
        public async  Task<List<(ApplicationUser User, string[] Roles)>> GetUsersAndRolesAsync(int page, int pageSize)
        {

            //var xx= new Data().Getrolealluser();
            var users = _userManager.Users.ToList();

            //ApplicationUser usersVM = new ApplicationUser();
            //foreach (var user in users)
            //{
            //    var userAndRoles = await GetUserAndRolesAsync(user.Id);
            //    if (userAndRoles == null)
            //        return null;

            //    usersVM = _mapper.Map<ApplicationUser>(userAndRoles.Value.User);
            //    usersVM.Roles = userAndRoles.Value.Roles;

            //}



            //}

            var roles = _roleManager.Roles.ToList();
            string[] role = { };

           // return (users, role);
            throw new NotImplementedException();
            //foreach (var u in users)
            //{
            //    var role1 = _userManager.GetRolesAsync(u);
            //    string[] role =  role1.ToArray();
            //}


            //var roles = new Data().GetRoles().Where(r => userRoleIds.Contains(r.Id));
            // return await Task.Run(() => users.Select(u => (u, roles.ToArray())));




        }

        public async Task<(ApplicationUser User, string[] Roles)?> GetUserAndRolesAsync(string user)
        {

           
            var users =  await _userManager.FindByIdAsync(user);
           var roles =await  _userManager.GetRolesAsync(users);
            string[] role = roles.ToArray();
           
            return (users, role);
        }

      
    }
}
