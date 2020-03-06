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
    public class AccountManager : IAccountManager
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

        public async Task<(bool Succeeded, string[] Errors)> CreateUserAsync(ApplicationUser user, IEnumerable<string> roles, string password)
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
        public async Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(ApplicationUser user, IEnumerable<string> roles)
        {
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return (false, result.Errors.Select(e => e.Description).ToArray());


            foreach (var role in roles)
            {
                result = await this._userManager.AddToRoleAsync(user, role);
            }

            return (true, new string[] { });
        }

        public Task<List<ApplicationRole>> GetRolesLoadRelatedAsync(int page, int pageSize)
        {
            List<ApplicationRole> rr = new Data().GetRoles();
            var role = Task.Run(() => new List<ApplicationRole>(rr));
            return role;
            //   throw new NotImplementedException();
        }

        public async Task<ApplicationUser> GetUserByIdAsync(string userId)
        {
            var UserData = await _userManager.FindByIdAsync(userId);
            ApplicationUser applicationUser = new ApplicationUser()
            {
                Id = UserData.Id
            };
            
            var userrole = _userManager.GetRolesAsync(applicationUser);
            
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

        public async Task<ApplicationRole> GetRoleLoadRelatedAsync(string roleName)
        {
            ApplicationRole role = new Data().GetRoles().Where(r => r.Name == roleName).SingleOrDefault();
            var result = await _roleManager.GetClaimsAsync(role);
            role.Claims = result.ToList().ConvertAll(x => new IdentityRoleClaim<string> { ClaimType = x.Type, ClaimValue = x.Value });
            // var user = new Data().GetUsers().Where(x=>x.Roles== role);

            var role1 = await Task.Run(() => role);
            return role1;


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


        public async Task<List<(ApplicationUser User, string[] Roles)>> GetUsersAndRolesAsync(int page, int pageSize)
        {

            var roleswithids = new Data().Getrolealluser().ToList();
            var users = _userManager.Users.ToList();
            foreach (var user in users)
            {
                var a = roleswithids.Where(x => x.UserID == user.Id).ToList();
                var a1 = a.ConvertAll(x => new IdentityUserRole<string> { RoleId = x.ROLEID, UserId = x.UserID });
                user.Roles = a1;

            }
            var userRoleIds = users.SelectMany(u => u.Roles.Select(r => r.RoleId)).ToList();
            var roles = _roleManager.Roles.ToList();
            var role2 = roles
               .Where(r => userRoleIds.Contains(r.Id)).ToArray();
            return users
                  .Select(u => (u, role2.Where(r => u.Roles.Select(ur => ur.RoleId).Contains(r.Id)).Select(r => r.Name).ToArray()))
                  .ToList();



        }

        public async Task<(ApplicationUser User, string[] Roles)?> GetUserAndRolesAsync(string user)
        {


            var users = await _userManager.FindByIdAsync(user);
            var roles = await _userManager.GetRolesAsync(users);
            string[] role = roles.ToArray();

            return (users, role);
        }

        public Task<ApplicationUser> GetUserByEmailAsync(string email)
        {
            return _userManager.FindByEmailAsync(email);
        }

        public async Task<IList<ClaimViewModel>> GetUserClaimAsync(string roleid)
        {
            ApplicationRole role = new ApplicationRole();
            IList<ClaimViewModel> li = new List<ClaimViewModel>();
            role.Id = roleid;
            try
            {
                var result = await _roleManager.GetClaimsAsync(role);
                li = result.ToList().ConvertAll(x => new ClaimViewModel { Type = x.Type, Value = x.Value });
            }
            catch (Exception ex)
            {

            }

            return li;

        }

        public Task<bool> TestCanDeleteRoleAsync(string roleId)
        {
            string ret = new Data().checkrolecandelete(roleId);

            return Task.Run(() =>
                ret == "false" ? false : true);
        }
    }
}
