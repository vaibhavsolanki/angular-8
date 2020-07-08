using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Stationary.Models;
using AutoMapper;
using stationaryr.Models;
using stationaryr.Core.Interface;
using Microsoft.AspNetCore.Identity;
using stationaryr.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using System.Text.Json;
namespace stationaryr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IAccountManager _accountManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private const string GetUserByIdActionName = "GetUserId";
        private const string GetRoleByIdActionName = "GetRoleById";
        public AccountController(IConfiguration config, IAccountManager accountManager, SignInManager<ApplicationUser> signInManager, IMapper mapper)
        {
            _config = config;
            _mapper = mapper;
            _accountManager = accountManager;
            _signInManager = signInManager;
        }

        [HttpPost("[action]")]
        public IActionResult StateData()
        {
            return Ok(new Data().StateData());
        }

        [HttpPost("[action]")]

        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] logindata model)
        {


            var result = await _signInManager.PasswordSignInAsync(model.username, model.passward, model.RememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                var user = _accountManager.GetUserByEmailAsync(model.username);

                LoginResponse login = new LoginResponse();
                login.access_token = await GenerateJWT(user.Result.Id);

                //HttpContext.Session.SetString("user", user.Result.Id);

                return Ok(login);
            }
            else

            {
                //return Ok("success");
              return  BadRequest(new { message = "Username or password is incorrect" });
            }



        }

        [HttpDelete("users/{id}")]
        [ProducesResponseType(200, Type = typeof(UserViewModel))]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteUser(string id)
        {
            //if (!(await _authorizationService.AuthorizeAsync(this.User, id, AccountManagementOperations.Delete)).Succeeded)
            //    return new ChallengeResult();


            ApplicationUser appUser = await _accountManager.GetUserByIdAsync(id);

            if (appUser == null)
                return NotFound(id);

            if (!await _accountManager.TestCanDeleteUserAsync(id))
                return BadRequest("User cannot be deleted. Delete all orders associated with this user and try again");


            UserViewModel userVM = await GetUserViewModelHelper(appUser.Id);

            var result = await _accountManager.DeleteUserAsync(appUser);
            if (!result.Succeeded)
                throw new Exception("The following errors occurred whilst deleting user: " + string.Join(", ", result.Errors));


            return Ok(userVM);
        }



        async Task<string> GenerateJWT(string id)
        {



            UserViewModel userVM = await GetUserViewModelHelper(id);
            List<List<ClaimViewModel>> claim1 = new List<List<ClaimViewModel>>();
            foreach (var roles in userVM.Roles)
            {

                var role = await _accountManager.GetRoleByNameAsync(roles);

                var userclaim = await _accountManager.GetUserClaimAsync(role.Id);
                claim1.Add(userclaim.ToList());
            }
            List<ClaimViewModel> claim2 = new List<ClaimViewModel>();

            foreach(var t in claim1)
            {
                foreach (var y in t)
                {
                    claim2.Add(y);
                }
            }

            //var json = System.Text.Json.JsonSerializer.Serialize(claim2.Distinct());

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userVM.UserName),

                new Claim("role",JsonConvert.SerializeObject(userVM.Roles)),
                   new Claim("permission",JsonConvert.SerializeObject(claim2.Distinct())),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        private async Task<UserViewModel> GetUserViewModelHelper(string userId)
        {
            var userAndRoles = await _accountManager.GetUserAndRolesAsync(userId);
            if (userAndRoles == null)
                return null;

            var userVM = _mapper.Map<UserViewModel>(userAndRoles.Value.User);
            userVM.Roles = userAndRoles.Value.Roles;

            return userVM;
        }
        



        [HttpGet("users")]
        //    [Authorize(Authorization.Policies.ViewAllUsersPolicy)]
        [ProducesResponseType(200, Type = typeof(List<UserViewModel>))]
        public async Task<IActionResult> GetUsers()
        {
            return await GetUsers(-1, -1);
        }


        [HttpGet("users/{pageNumber:int}/{pageSize:int}")]
        //   [Authorize(Authorization.Policies.ViewAllUsersPolicy)]
        [ProducesResponseType(200, Type = typeof(List<UserViewModel>))]
        public async Task<IActionResult> GetUsers(int pageNumber, int pageSize)
        {
            var usersAndRoles = await _accountManager.GetUsersAndRolesAsync(pageNumber, pageSize);

            List<UserViewModel> usersVM = new List<UserViewModel>();

            foreach (var item in usersAndRoles)
            {
                var userVM = _mapper.Map<UserViewModel>(item.User);
                userVM.Roles = item.Roles;

                usersVM.Add(userVM);
            }

            return Ok(usersVM);

        }

        [HttpGet("getuserId/{id}")]
        public IActionResult GetUserId(string ID)
        {
            
            var userAndRoles = _accountManager.GetUserAndRolesAsync(ID);
            if (userAndRoles == null)
                return null;

            var userVM = _mapper.Map<UserViewModel>(userAndRoles.Result.Value.User);
            userVM.Roles = userAndRoles.Result.Value.Roles;

            return Ok(userVM); 
            
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Updateusers([FromBody] UserEditViewModel user)
        {
            if (user == null)
                return BadRequest($"{nameof(user)} cannot be null");

            ApplicationUser appUser = _mapper.Map<ApplicationUser>(user);

            var result = await _accountManager.UpdateUserAsync(appUser, user.Roles);

            if (result.Succeeded)
            {
            }
            return Ok("");
        }
        [HttpPost("[action]")]

        public async Task<IActionResult> Register([FromBody] UserEditViewModel user)
        {
            //if (!(await IAuthorizationService.AuthorizeAsync(this.User, (user.Roles, new string[] { }), Authorization.Policies.AssignAllowedRolesPolicy)).Succeeded)
            //    return new ChallengeResult();
            if (ModelState.IsValid)
            {
                if (user == null)
                    return BadRequest($"{nameof(user)} cannot be null");


                ApplicationUser appUser = _mapper.Map<ApplicationUser>(user);
                // var user = new ApplicationUser { UserName = model.EMAILID, Email = model.EMAILID };
                var result = await _accountManager.CreateUserAsync(appUser, user.Roles, user.NewPassword);

                if (result.Succeeded)
                {
                    return Ok("success");
                }
                AddError(result.Errors);
            }
                return BadRequest(ModelState);
            
        }


        [HttpGet("roles")]
        // [Authorize(Authorization.Policies.ViewAllRolesPolicy)]
        [ProducesResponseType(200, Type = typeof(List<RoleViewModel>))]
        public async Task<IActionResult> GetRoles()
        {
            return await GetRoles(-1, -1);
        }


        [HttpGet("roles/{pageNumber:int}/{pageSize:int}")]
        //  [Authorize(Authorization.Policies.ViewAllRolesPolicy)]
        [ProducesResponseType(200, Type = typeof(List<RoleViewModel>))]
        public async Task<IActionResult> GetRoles(int pageNumber, int pageSize)
        {
            var roles = await _accountManager.GetRolesLoadRelatedAsync(pageNumber, pageSize);

            List<RoleViewModel> roles1 = new List<RoleViewModel>();

            foreach (var role in roles)
            {
                roles1.Add(new RoleViewModel() { Id = role.Id, Name = role.Name, Description = role.Description });
            }

            return Ok(roles1);
        }

        [HttpPost("roles")]
        //  [Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        [ProducesResponseType(201, Type = typeof(RoleViewModel))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateRole([FromBody] RoleViewModel role)
        {
            if (ModelState.IsValid)
            {
                if (role == null)
                    return BadRequest($"{nameof(role)} cannot be null");

                ApplicationRole appRole = _mapper.Map<ApplicationRole>(role);

                var result = await _accountManager.CreateRoleAsync(appRole, role.Permissions?.Select(p => p.Value).ToArray());
                if (result.Succeeded)
                {

                    return Ok(result);
                    //RoleViewModel roleVM = await GetRoleViewModelHelper(appRole.Name);
                    // return CreatedAtAction(GetRoleByIdActionName, new { id = roleVM.Id }, roleVM);
                }

                AddError(result.Errors);
            }

            return BadRequest(ModelState);
        }

        [HttpGet("permissions")]
        //  [Authorize(Authorization.Policies.ViewAllRolesPolicy)]
        [ProducesResponseType(200, Type = typeof(List<PermissionViewModel>))]
        public IActionResult GetAllPermissions()
        {
            return Ok(_mapper.Map<List<PermissionViewModel>>(ApplicationPermissions.AllPermissions));
        }


        [HttpPut("roles/{id}")]
        // [Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateRole(string id, [FromBody] RoleViewModel role)
        {
            if (ModelState.IsValid)
            {
                if (role == null)
                    return BadRequest($"{nameof(role)} cannot be null");
                ApplicationRole appRole = await _accountManager.GetRoleByIdAsync(id);
                _mapper.Map<RoleViewModel, ApplicationRole>(role, appRole);
                if (appRole == null)
                    return NotFound(id);
                var result = await _accountManager.UpdateRoleAsync(appRole, role.Permissions?.Select(p => p.Value).ToArray());
                if (result.Succeeded)
                    return NoContent();
            }
            return BadRequest(ModelState);

        }

        [HttpGet("roles/{id}", Name = GetRoleByIdActionName)]
        [ProducesResponseType(200, Type = typeof(RoleViewModel))]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetRoleById(string id)
        {
            var appRole = await _accountManager.GetRoleByIdAsync(id);

            //if (!(await _authorizationService.AuthorizeAsync(this.User, appRole?.Name ?? "", Authorization.Policies.ViewRoleByRoleNamePolicy)).Succeeded)
            //    return new ChallengeResult();

            if (appRole == null)
                return NotFound(id);

            return await GetRoleByName(appRole.Name);
        }

        [HttpGet("roles/name/{name}")]
        [ProducesResponseType(200, Type = typeof(RoleViewModel))]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetRoleByName(string name)
        {
            //if (!(await _authorizationService.AuthorizeAsync(this.User, name, Authorization.Policies.ViewRoleByRoleNamePolicy)).Succeeded)
            //    return new ChallengeResult();


            RoleViewModel roleVM = await GetRoleViewModelHelper(name);

            if (roleVM == null)
                return NotFound(name);

            return Ok(roleVM);
        }

        private async Task<RoleViewModel> GetRoleViewModelHelper(string roleName)
        {
            RoleViewModel r = new RoleViewModel();
            var role = await _accountManager.GetRoleLoadRelatedAsync(roleName);
            if (role != null)

            {
                r.Id = role.Id;
                r.Name = role.Name;
                r.Description = role.Description;
                var claim = role.Claims.ToList().ConvertAll(x => new PermissionViewModel() { Name = x.ClaimType, Value = x.ClaimValue });
                r.Permissions = claim.ToArray();
            }


            return r;
            // return _mapper.Map<RoleViewModel>(role);



        }

        [HttpDelete("roles/{id}")]
        // [Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        [ProducesResponseType(200, Type = typeof(RoleViewModel))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteRole(string id)
        {

            ApplicationRole appRole = await _accountManager.GetRoleByIdAsync(id);

            if (appRole == null)
                return NotFound(id);
            if (!await _accountManager.TestCanDeleteRoleAsync(id))
                return BadRequest("Role cannot be deleted. Remove all users from this role and try again");


            var result = await _accountManager.DeleteRoleAsync(appRole);
            if (!result.Succeeded)
                throw new Exception("The following errors occurred whilst deleting role: " + string.Join(", ", result.Errors));
            return Ok(result);
        }

        private void AddError(IEnumerable<string> errors, string key = "")
        {
            foreach (var error in errors)
            {
                AddError(error, key);
            }
        }

        private void AddError(string error, string key = "")
        {
            ModelState.AddModelError(key, error);
        }



    }
    public class logindata
    {
        public string username { get; set; }
        public string passward { get; set; }
        public string role { get; set; }
        public List<role> approle { get; set; }
        public string? token { get; set; }
        public bool RememberMe { get; set; }


    }
    public class LoginResponse
    {
        public string access_token { get; set; }
        public string refresh_token { get; set; }
        public string expires_in { get; set; }
        public string token_type { get; set; }
    }
}