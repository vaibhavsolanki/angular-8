using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Stationary.Models;
using stationaryr.Core.Interface;
using stationaryr.Models;

namespace stationaryr.Core
{
    public class AccountManager:IAccountManager
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;


        public AccountManager(UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager)
        {
            
            _userManager = userManager;
            _roleManager = roleManager;

        }

        public async Task<(bool Succeeded, string[] Errors)> CreateUserAsync(ApplicationUser user, IEnumerable<string> roles,string password)// ,
        {
            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
                return (false, result.Errors.Select(e => e.Description).ToArray());

            user = await _userManager.FindByNameAsync(user.UserName);

            try
            {
                result = await this._userManager.AddToRolesAsync(user, roles.Distinct());
            }
            catch
            {
                await DeleteUserAsync(user);
                throw;
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

        public Task<List<(ApplicationUser User, string[] Roles)>> GetUsersAndRolesAsync(int page, int pageSize)
        {
           

            // throw new NotImplementedException();
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

        public Task<IList<string>> GetUserRolesAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
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
    }
}
