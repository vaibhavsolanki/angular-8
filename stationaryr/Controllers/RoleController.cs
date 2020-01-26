using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stationary.Models;
using stationaryr.Models;
using Microsoft.AspNetCore.Identity;
namespace stationaryr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RoleController : ControllerBase
    {
       

        //[HttpPost("[action]")]
        //public IActionResult GetRoles()
        //{
        //    return Ok(new Role().GetRoles());
        //}
        //[HttpGet("getRoleId/{id}")]
        //public IActionResult getRoleId(string ID)
        //{
        //    return Ok(new Role().getRoleId(ID));
        //}

        //[HttpPost("[action]")]
        //[ProducesResponseType(StatusCodes.Status200OK)]

        //public string Saverole(RoleViewModel role)
        //{

        //    return new Role().Saverole(role);
        //}

        //[HttpPost("[action]")]


        ////public string Updaterole(RoleViewModel role)
        ////{

        ////    return new Role().Updaterole(role);
        ////}
        //[HttpDelete("deleterole/{id}")]


        //public string deleterole(string ID)
        //{
        //    return new Role().deleterole(ID);
        //}



    }
}