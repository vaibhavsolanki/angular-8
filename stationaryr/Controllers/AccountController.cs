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

namespace stationaryr.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 

    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IAccountManager _accountManager;
      //  private readonly SignInManager<ApplicationUser> _signInManager;
        private const string GetUserByIdActionName = "GetUserById";
        private const string GetRoleByIdActionName = "GetRoleById";
        public AccountController(IConfiguration config , IAccountManager accountManager, SignInManager<ApplicationUser> signInManager, IMapper mapper)
        {
            _config = config;
            _mapper = mapper;
             _accountManager = accountManager;
           // _signInManager = signInManager;
        }

        [HttpPost("[action]")]
        public IActionResult StateData()
        {
            return Ok(new Data().StateData());
        }

        //[HttpPost("[action]")]

        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public async Task<IActionResult> Login([FromBody] logindata model)
        //{
        //    var result = "";
          //  var result = await _signInManager.PasswordSignInAsync(model.username, model.passward, model.RememberMe, lockoutOnFailure: false);
            //if (result.Succeeded)
            //{
            //    return Ok("success");
            //}
            //else

            //{
            //    return Ok("success");
            //    // return  BadRequest(new { message = "Username or password is incorrect" });
            //}

                //return Ok(new Data().StateData());
                //var user = Data.getuser().Where(x => x.NAME == logindata.username && x.PASSWORD == logindata.passward).ToList();
                //if (user != null)
                //{

                //    logindata.role = user[0].ROLE;
                //    logindata.approle = user[0].APPROLE.ToList();
                //    var tokenString = GenerateJWT(logindata);
                //    logindata.token = tokenString;
                //    return Ok(logindata);

                //}
                //else
                //{

                //    return BadRequest(new { message = "Username or password is incorrect" });

                //}

           // }
        [HttpPatch("Account/Updateusers")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> UpdateCurrentUser(ApplicationUser model)
        {
            var result = "nnn";//await _accountManager.CreateUserAsync(model, model.PasswordHash);

            return Ok(result);
        }


        [HttpPatch("Account/GetUsers")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetUsers(ApplicationUser model)
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

        [HttpPost("[action]")]

        public async Task<IActionResult> Register([FromBody] UserEditViewModel user)
        {
            //if (!(await IAuthorizationService.AuthorizeAsync(this.User, (user.Roles, new string[] { }), Authorization.Policies.AssignAllowedRolesPolicy)).Succeeded)
            //    return new ChallengeResult();
            if (user == null)
                return BadRequest($"{nameof(user)} cannot be null");
            //ApplicationUser appUser = new ApplicationUser();
            //appUser.UserName = user.UserName;
            //appUser.PasswordHash = user.NewPassword;
            //appUser.PhoneNumber = user.PhoneNumber;
           // appUser.Roles = user.Roles.;
           // appUser.Email = user.Email;

            ApplicationUser appUser = _mapper.Map<ApplicationUser>(user);
            // var user = new ApplicationUser { UserName = model.EMAILID, Email = model.EMAILID };
            var result = await _accountManager.CreateUserAsync(appUser, user.Roles, user.NewPassword);
            if (result.Succeeded)
            {
            }
            return Ok("");
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

            foreach(var role in roles)
            {
                roles1.Add(new RoleViewModel() { Id=role.Id,Name=role.Name,Description=role.Description});
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
                //ApplicationRole appRole = new ApplicationRole();
                //appRole.Id = role.Id;
                //appRole.Name = role.Name;
                //appRole.Description = role.Description;
              //  appRole.Id = role.Id;
                ApplicationRole appRole = _mapper.Map<ApplicationRole>(role);

                var result = await _accountManager.CreateRoleAsync(appRole, role.Permissions?.Select(p => p.Value).ToArray());
                if (result.Succeeded)
                {

                    return Ok(result);
                    //RoleViewModel roleVM = await GetRoleViewModelHelper(appRole.Name);
                   // return CreatedAtAction(GetRoleByIdActionName, new { id = roleVM.Id }, roleVM);
                }

                //AddError(result.Errors);
            }

            return BadRequest(ModelState);
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
            var role = await _accountManager.GetRoleLoadRelatedAsync(roleName);
            if (role != null)
                return _mapper.Map<RoleViewModel>(role);


            return null;
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


            var result = await _accountManager.DeleteRoleAsync(appRole);
            if (!result.Succeeded)
                throw new Exception("The following errors occurred whilst deleting role: " + string.Join(", ", result.Errors));
            return Ok(result);
        }
        //[HttpGet("users/me/preferences")]
        //[ProducesResponseType(200, Type = typeof(string))]
        //public async Task<IActionResult> UserPreferences()
        //{
        //    var userId = Utilities.GetUserId(this.User);
        //    ApplicationUser appUser = await _accountManager.GetUserByIdAsync(userId);

        //    return Ok(appUser.Configuration);
        //}

        string GenerateJWT(logindata userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.username),
                new Claim("username", userInfo.username.ToString()),
                new Claim("role",userInfo.role),

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
}