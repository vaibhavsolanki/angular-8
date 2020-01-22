using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Stationary.Models;
namespace Stationary.Controllers
{
    [ApiController]
    [Route("[controller]")]
  
    public class WeatherForecastController : ControllerBase
    {
        private readonly IConfiguration _config;
        public WeatherForecastController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("[action]")]
        public IActionResult StateData()
        {
            return Ok(new Data().StateData());
        }

        [HttpPost("[action]")]

        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult logincheck([FromBody] logindata logindata)
        {
            //return Ok(new Data().StateData());
          var user=  Data.getuser().Where(x => x.NAME == logindata.username && x.PASSWORD == logindata.passward).ToList() ;
            if (user != null)
            {

                logindata.role = user[0].ROLE;
                logindata.approle = user[0].APPROLE.ToList();
                var tokenString = GenerateJWT(logindata);
                logindata.token = tokenString;
                return Ok(logindata);
                
            }
            else
            {

                return BadRequest(new { message = "Username or password is incorrect" });

            }

        }

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
    }
}
