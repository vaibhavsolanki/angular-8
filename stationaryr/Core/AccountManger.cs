using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
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
            return (true, new string[] { });
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
            throw new NotImplementedException();
        }
    }
}
