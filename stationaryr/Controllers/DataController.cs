using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stationary.Models;
namespace Stationary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DataController : ControllerBase
    {
        [HttpPost("[action]")]
        public IActionResult PMLDashboard()
        {
            return Ok(new Data().PMLDashboard());
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string UserProfileSave(USER user)
        { 
       
            return new Data().UserProfileSave(user);
        }
        [HttpPost("[action]")]
        public IActionResult GetProfile()
        {
            return Ok(new Data().GetProfile());
        }
        [HttpGet("GetProfilebyID/{id}")]
        public IActionResult GetProfilebyID(int ID)
        {
            return Ok(new Data().GetProfilebyid(ID));
        }
        [HttpDelete("deleteProfileId/{id}")]

        public string deleteProfileId(int ID)
        {
            return new Data().deleteProfileId(ID);
        }

        [HttpGet("GetMaterial/{status}")]
        public IActionResult GetMaterial(string status)
        {
            return Ok(new Data().GetMaterial(status));
        }
        [HttpGet("GetmaterialID/{id}")]
        public IActionResult GetmaterialID(int ID)
        {
            return Ok(new Data().GetmaterialID(ID));
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string MaterialSave(Material material)
        {

            return new Data().MaterialSave(material);
        }

        [HttpPost("[action]")]
       

        public string MaterialUpdate(Material material)
        {

            return new Data().MaterialUpdate(material);
        }
        [HttpDelete("deleteMaterial/{id}")]

        
        public string deleteMaterial(int ID)
        {
            return new Data().deleteMaterial(ID);
        }
        //Company
       
        [HttpPost("[action]")]
        public IActionResult GetCompany()
        {
            return Ok(new Data().GetCompany());
        }
        [HttpGet("getcompanyId/{id}")]
        public IActionResult getcompanyId(int ID)
        {
            return Ok(new Data().getcompanyId(ID));
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string SaveCompany(Company company)
        {

            return new Data().SaveCompany(company);
        }

        [HttpPost("[action]")]


        public string Updatecompany(Company company)
        {

            return new Data().Updatecompany(company);
        }
        [HttpDelete("deletecompany/{id}")]


        public string deletecompany(int ID)
        {
            return new Data().deletecompany(ID);
        }


        //unit
        [HttpPost("[action]")]
        public IActionResult GetUnits()
        {
            return Ok(new Data().GetUnits());
        }
        [HttpGet("getunitsId/{id}")]
        public IActionResult getunitsId(int ID)
        {
            return Ok(new Data().getunitsId(ID));
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string SaveUnits(Units Units)
        {

            return new Data().SaveUnits(Units);
        }

        [HttpPost("[action]")]


        public string Updateunits(Units Units)
        {

            return new Data().Updateunits(Units);
        }
        [HttpDelete("deleteunits/{id}")]


        public string deleteunits(int ID)
        {
            return new Data().deleteunits(ID);
        }


        //subcategory

        [HttpGet("GetSubcategory/{id}/{status}")]
        public IActionResult GetSubcategory(string id,string status)
        {
            return Ok(new Data().GetSubcategory(id,status));
        }
        [HttpGet("getSubcategoryId/{id}")]
        public IActionResult getSubcategoryId(int ID)
        {
            return Ok(new Data().getSubcategoryId(ID));
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string SaveSubcategory(SubCategory SubCategory)
        {

            return new Data().SaveSubcategory(SubCategory);
        }

        [HttpPost("[action]")]


        public string UpdateSubcategory(SubCategory SubCategory)
        {

            return new Data().UpdateSubcategory(SubCategory);
        }
        [HttpDelete("deleteSubcategory/{id}")]


        public string deleteSubcategory(int ID)
        {
            return new Data().deleteSubcategory(ID);
        }


        [HttpGet("GetCategoryDropdown/{id}/{status}")]
        public IActionResult GetCategoryDropdown(string id,string status)
        {
            return Ok(new Data().GetCategoryDropdown(id,status));
        }
        [HttpGet("GetMaterialforstaOrprint/{str}")]

        public IActionResult GetMaterialforstaOrprint(string str)
        {
            return Ok(new Data().GetMaterialforstaOrprint(str));
        }
        [HttpGet("Getsubcategoryonchange/{str}")]
        public IActionResult Getsubcategoryonchange(string str)
        {
            return Ok(new Data().Getsubcategoryonchange(str));
        }


        //stationary Repository


        [HttpPost("[action]")]
        public IActionResult GetStationary_Repository()
        {
            return Ok(new Data().GetStationary_Repository());
        }
        [HttpGet("getStationary_RepositoryId/{id}")]
        public IActionResult getStationary_RepositoryId(int ID)
        {
            return Ok(new Data().getStationary_RepositoryId(ID));
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string SaveStationary_Repository(StationaryRepository StationaryRepository)
        {

            return new Data().SaveStationary_Repository(StationaryRepository);
        }

        [HttpPost("[action]")]


        public string UpdateStationary_Repository(StationaryRepository StationaryRepository)
        {

            return new Data().UpdateStationary_Repository(StationaryRepository);
        }
        [HttpDelete("deleteStationary_Repository/{id}")]


        public string deleteStationary_Repository(int ID)
        {
            return new Data().deleteStationary_Repository(ID);
        }


        //print repository



        [HttpPost("[action]")]
        public IActionResult GetPrint_Repository()
        {
            return Ok(new Data().GetPrint_Repository());
        }
        [HttpGet("getPrint_RepositoryId/{id}")]
        public IActionResult getPrint_RepositoryId(int ID)
        {
            return Ok(new Data().getPrint_RepositoryId(ID));
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string SavePrint_Repository(PrintRepository PrintRepository)
         {

            return new Data().SavePrint_Repository(PrintRepository);
        }

        [HttpPost("[action]")]


        public string UpdatePrint_Repository(PrintRepository PrintRepository)
        {

            return new Data().UpdatePrint_Repository(PrintRepository);
        }
        [HttpDelete("deletePrint_Repository/{id}")]


        public string deletePrint_Repository(int ID)
        {
            return new Data().deletePrint_Repository(ID);
        }


        //dghuser
        

        [HttpGet("dghemployee/{status}")]
        public IActionResult dghemployee(string status)
        {
            return Ok(new Data().dghemployee(status));
        }


        [HttpPost("[action]")]
        public IActionResult GetDGHuser_Repository()
        {
            return Ok(new Data().GetDGHuser_Repository());
        }
        [HttpGet("getDGHuser_RepositoryId/{id}")]
        public IActionResult getDGHuser_RepositoryId(int ID)
        {
            return Ok(new Data().getDGHuser_RepositoryId(ID));
        }


        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string SaveDghuser_Repository(DGHUserRepository DGHUserRepository)
        {

            return new Data().SaveDghuser_Repository(DGHUserRepository);
        }

        [HttpPost("[action]")]


        public string UpdateDghuser_Repository(DGHUserRepository DGHUserRepository)
        {

            return new Data().UpdateDghuser_Repository(DGHUserRepository);
        }
        [HttpDelete("deleteDghuser_Repository/{id}")]


        public string deleteDghuser_Repository(int ID)
        {
            return new Data().deleteDghuser_Repository(ID);
        }

        [HttpPost("[action]")]
        public IActionResult dghreport(Report Report)
        {
            return Ok(new Data().dghreport(Report));
        }
        [HttpPost("[action]")]
        public IActionResult GetStock(getstock Report)
                                    {
            return Ok(new Data().GetStock(Report));
        }
        [HttpDelete("Deletereceiveditem/{id}")]
        public string Deletereceiveditem(int ID)
        {
            return new Data().Deletereceiveditem(ID);
        }


        //user repository



        [HttpPost("[action]")]
        public IActionResult GetUsers()
        {
            return Ok(new Data().GetUsers());
        }
        [HttpGet("getuserId/{id}")]
        public IActionResult getuserId(int ID)
        {
            return Ok(new Data().getuserId(ID));
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string SaveUsers(UsersDgh UsersDgh)
        {

            return new Data().SaveUsers(UsersDgh);
        }

        [HttpPost("[action]")]


        public string Updateusers(UsersDgh UsersDgh)
        {

            return new Data().Updateusers(UsersDgh);
        }
        [HttpDelete("deleteusers/{id}")]


        public string deleteusers(int ID)
        {
            return new Data().deleteusers(ID);
        }

        //contract


        

        [HttpPost("[action]")]
        public IActionResult GetContractform()
        {
            return Ok(new Data().GetContractform());
        }
        [HttpGet("getContractformId/{id}")]
        public IActionResult getContractformId(int ID)
        {
            return Ok(new Data().getContractformId(ID));
        }


        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string SaveContractform(Contract Contract)
        {

            return new Data().SaveContractform(Contract);
        }

        [HttpPost("[action]")]


     
        [HttpDelete("deleteContractform/{id}")]


        public string deleteContractform(int ID)
        {
            return new Data().deleteContractform(ID);
        }

        //device name
        [HttpPost("[action]")]
        public IActionResult GetDevicename()
        {
            return Ok(new Data().GetDevicename());
        }
        [HttpGet("deleteDevicename/{id}")]
        public IActionResult deleteDevicename(int ID)
        {
            return Ok(new Data().deleteDevicename(ID));
        }


        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
      
        public string SaveDevicename(devicename devicename)
        {

            return new Data().SaveDevicename(devicename);
        }

        [HttpPost("[action]")]


        public string UpdateDevicename(devicename devicename)
        {

            return new Data().UpdateDevicename(devicename);
        }
        [HttpDelete("getDevicenameId/{id}")]

        [HttpGet("getDevicenameId/{id}")]
        public IActionResult getDevicenameId(int ID)
        {
            return Ok(new Data().getDevicenameId(ID));
        }

    }
}