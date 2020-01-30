using stationaryr.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace stationaryr.Core.Interface
{
    public interface IAccountManager
    {
        Task<ApplicationUser> GetUserByIdAsync(string userId);
        Task<ApplicationUser> GetUserByUserNameAsync(string userName);
        Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(ApplicationUser user);
        Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(string userId);
        Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(ApplicationRole role);
        Task<(bool Succeeded, string[] Errors)> DeleteRoleAsync(string roleName);
        Task<List<ApplicationRole>> GetRolesLoadRelatedAsync(int page, int pageSize);
        Task<(ApplicationUser User, string[] Roles)?> GetUserAndRolesAsync(string user);
      Task<List<(ApplicationUser User, string[] Roles)>> GetUsersAndRolesAsync(int page, int pageSize);
        Task<IList<string>> GetUserRolesAsync(ApplicationUser user);

       // Task<IList<string>> GetRolesAsync(ApplicationUser user, CancellationToken cancellationToken)
        Task<(bool Succeeded, string[] Errors)> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);
        Task<ApplicationRole> GetRoleByIdAsync(string roleId);
        Task<ApplicationRole> GetRoleByNameAsync(string roleName);
        Task<ApplicationRole> GetRoleLoadRelatedAsync(string roleName);
        Task<(bool Succeeded, string[] Errors)> UpdateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        Task<(bool Succeeded, string[] Errors)> CreateUserAsync(ApplicationUser user, IEnumerable<string> roles, string password);// 
    }
}
