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
    // [Authorize(Roles ="admin")]
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
            //var user = HttpContext.Session.GetString("user");
            return Ok(new Data().GetMaterial(status));
        }
        [HttpGet("GetmaterialID/{id}")]
        public IActionResult GetmaterialID(int ID)
        {
            return Ok(new Data().GetmaterialID(ID));
        }

        [HttpGet("GetmaterialquantitybyCat")]
        public IActionResult GetmaterialquantitybyCat()
        {
            try
            {
                List<Material_QuantityCategory> m = new List<Material_QuantityCategory>();
                List<Material_QuantityCategory_Request> r = new List<Material_QuantityCategory_Request>();
                m = new Data().GetMaterial_Quantities();
                r = new Data().GetMaterial_Quantities_Requested();

                List<Material_QuantityCategory> ret = new List<Material_QuantityCategory>();

                foreach (var item in m)
                {
                    foreach (var i in r)
                    {
                        if (item.Category == i.ID)
                        {
                            Material_QuantityCategory final = new Material_QuantityCategory();
                            var finalQuanity = item.Quantity - i.Quantity;

                            if (finalQuanity < 0)
                            {
                                finalQuanity = 0;
                            }
                            final.Quantity = finalQuanity;
                            final.Category = item.Category;
                            final.Items_Description = item.Items_Description;
                            final.Itemcode = item.Itemcode;
                            ret.Add(final);

                        }
                    }

                    
                }
                return Ok(ret);
            }

            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet("GetmaterialquantitybySubCat")]
        public IActionResult GetmaterialquantitybySubCat()
        {
            try
            {

                List<Materail_Quantity_Sub> sub = new List<Materail_Quantity_Sub>();
                List<Materail_Quantity_Sub> subRequest = new List<Materail_Quantity_Sub>();

                sub = new Data().GetMaterial_QuantitiesSub();
                subRequest = new Data().GetMaterial_Quantities_Requested_Sub();

                List<Materail_Quantity_Sub> ret = new List<Materail_Quantity_Sub>();
                foreach (var item in sub)
                {
                    foreach (var i in subRequest)
                    {


                        if (item.Category == i.Category && item.Subcategory == i.Subcategory)
                        {

                            Materail_Quantity_Sub final = new Materail_Quantity_Sub();
                            var finalQuanity = item.QuantityBySub - i.QuantityBySub;
                            if (finalQuanity < 0)
                            {
                                finalQuanity = 0;
                            }
                            final.QuantityBySub = finalQuanity;
                            final.Category = item.Category;
                            final.Subcategory = item.Subcategory;
                            final.Items_Description = item.Items_Description;
                            final.Description = item.Description;
                            ret.Add(final);


                        }

                    }
                }

               

                return Ok(ret);
            }

            catch (Exception ex)
            {
                return BadRequest(ex);
            }
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
        public IActionResult GetSubcategory(string id, string status)
        {
            return Ok(new Data().GetSubcategory(id, status));
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
        public IActionResult GetCategoryDropdown(string id, string status)
        {
            return Ok(new Data().GetCategoryDropdown(id, status));
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

        //department
        [HttpGet("department")]
        public IActionResult department()
        {
            return Ok(new Data().department());
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




        //contract




        [HttpGet("[action]")]
        public IActionResult GetContractform()
        {
            return Ok(new Data().GetContractform());
        }
        [HttpGet("getContractformId/{id}")]
        public IActionResult getContractformId(string ID)
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
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string UpdateContractform(Contract Contract)
        {

            return new Data().UpdateContractform(Contract);
        }




        [HttpPost("[action]")]



        [HttpDelete("deleteContractform/{id}")]


        public string deleteContractform(string ID)
        {
            return new Data().deleteContractform(ID);
        }

        //device name
        [HttpGet("[action]")]
        public IActionResult GetDevicename()
        {
            return Ok(new Data().GetDevicename());
        }
        [HttpDelete("deleteDevicename/{id}")]
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


        [HttpGet("getDevicenameId/{id}")]
        public IActionResult getDevicenameId(int ID)
        {
            return Ok(new Data().getDevicenameId(ID));
        }

        //itreleaseorder
        [HttpPost("[action]")]
        public IActionResult savereleaseorder(itreleaseorder itreleaseorder)
        {
            return Ok(new Data().savereleaseorder(itreleaseorder));
        }

        [HttpGet("[action]")]
        public IActionResult getreleaseorder()
        {
            return Ok(new Data().getreleaseorder());
        }
        [HttpGet("getreleaseorderbyid/{id}")]
        public IActionResult getreleaseorderbyid(int ID)
        {
            return Ok(new Data().getreleaseorderbyid(ID));
        }
        [HttpDelete("deletereleaseorder/{id}")]
        public IActionResult deletereleaseorder(int ID)
        {
            return Ok(new Data().deletereleaseorder(ID));
        }
        //itvendor
        [HttpGet("[action]")]
        public IActionResult GetItVendor()
        {
            return Ok(new Data().GetItVendor());
        }
        [HttpDelete("DeleteItVendor/{id}")]
        public IActionResult DeleteItVendor(int ID)
        {
            return Ok(new Data().DeleteItVendor(ID));
        }


        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string SaveItVendor(itvendor itvendor)
        {

            return new Data().SaveItVendor(itvendor);
        }

        [HttpPost("[action]")]


        public string UpdateItVendor(itvendor itvendor)
        {

            return new Data().UpdateItVendor(itvendor);
        }

        [HttpGet("GetItVendorById/{id}")]
        public IActionResult GetItVendorById(int ID)
        {
            return Ok(new Data().GetItVendorById(ID));
        }
        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string SaveItItemReceipt(itemreceipt itemreceipt)
        {

            return new Data().SaveItItemReceipt(itemreceipt);
        }

        [HttpGet("[action]")]
        public IActionResult GetItItemReceipt()
        {
            return Ok(new Data().GetItItemReceipt());
        }
        [HttpGet("GetItItemReceiptById/{id}")]
        public IActionResult GetItItemReceiptById(int ID)
        {
            return Ok(new Data().GetItItemReceiptById(ID));
        }

        //itissueitems

        [HttpGet("[action]")]
        public IActionResult GetItIssueItems()
        {
            return Ok(new Data().GetItIssueItems());
        }
        [HttpDelete("DeleteItIssueItems/{id}")]
        public IActionResult DeleteItIssueItems(string ID)
        {
            return Ok(new Data().DeleteItIssueItems(ID));
        }


        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public string SaveItIssueItems(AdminIssue adminIssue)
        {

            return new Data().SaveItIssueItems(adminIssue);
        }

        [HttpPost("[action]")]


        public string UpdateIssueItems(AdminIssue AdminIssue)
        {

            return new Data().UpdateIssueItems(AdminIssue);
        }

        [HttpGet("GetItIssueItemsById/{id}")]
        public IActionResult GetItIssueItemsById(string ID)
        {
            return Ok(new Data().GetItIssueItemsById(ID));
        }
        [HttpGet("GetCategoryPostion/{str}")]

        public IActionResult GetCategoryPostion(string str)
        {
            return Ok(new Data().GetCategoryPostion(str));
        }


        [HttpGet("GetSubCategoryPostion/{byName}")]

        public IActionResult GetSubCategoryPostion(string str, string category)
        {
            return Ok(new Data().GetSubCategoryPostion(str));
        }
        //



    }
}