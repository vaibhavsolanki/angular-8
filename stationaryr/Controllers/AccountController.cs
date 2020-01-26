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
        public AccountController(IConfiguration config , IAccountManager accountManager)
        {
            _config = config;
           
            _accountManager = accountManager;
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
                return Ok("success");
            }
            else

            {
                return Ok("error");//BadRequest(new { message = "Username or password is incorrect" });
            }

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

            }
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
            if (user == null)
                return BadRequest($"{nameof(user)} cannot be null");
            ApplicationUser appUser = _mapper.Map<ApplicationUser>(user);
            //var user = new ApplicationUser { UserName = model.EMAILID, Email = model.EMAILID };
            var result = await _accountManager.CreateUserAsync(appUser, user.Roles, user.NewPassword);
            if (result.Succeeded)
            {
            }
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