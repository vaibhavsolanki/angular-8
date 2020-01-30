using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stationary.Models
{
   

    public class StateTable
    {
        public int STATE_ID { get; set; }
        public string STATE { get; set; }
        public string COMBINE_STATE { get; set; }
    }
    public class PMLGerenaldata
    {
        public string DRAFT_ID { get; set; }
        public string APPID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Type_of_company { get; set; }
        public string State { get; set; }
        public string Regime { get; set; }
        public string APP_MODE { get; set; }
        public string Block_Asset { get; set; }
        public string APP_TYPE { get; set; }
        public string AFFIDAVIT { get; set; }
        public string PERIOD_REQUIRED { get; set; }
        public string BUSINESS_NATURE { get; set; }
        public string NAME_OF_PML { get; set; }
        public string BASIN_OR_ASSET { get; set; }
        public string AREA_APPLIED { get; set; }
        public string GRANT_ORD_NO_LAST { get; set; }
        public string EXISTING_AREA { get; set; }
        public DateTime DATE_OF_GRANT { get; set; }
        public string LEASE_AREA { get; set; }
        public DateTime DATE_OF_PML_DEED { get; set; }
        public string CUMULATIVE_PROD_OILGAS { get; set; }
        public DateTime EFFECTIVE_DATE_TO { get; set; }
        public DateTime EFFECTIVE_DATE { get; set; }
        public DateTime PROD_COMMENCE_DATE { get; set; }
        public string REFID { get; set; }
        public string status { get; set; }
        public string CREATED_DATE { get; set; }
        public string RECOMMADATIONLETTER { get; set; }
        public string USER_ROLE { get; set; }
        public string DEPT_ID { get; set; }
        public string AREA_DETAILS { get; set; }
      //  public List<ApplicationStatus> App_status { get; set; }
        public string App_current_status { get; set; }
    }
    public class USER
    {
        public int ID { get; set; }
        public string EMP_ID { get; set; }
        public string  NAME { get; set; }
        public string ADDRESS { get; set; }
        public string CREATED_DATE { get; set; }
        public string ROLE { get; set; }
        public string PASSWORD { get; set; }
        public List<Department> DEPARTMENTS { get; set; }

        public List<role> APPROLE { get; set; }

    }

    public class role
    {
        public string EMP_ID { get; set; }
        public string Approle { get; set; }
    }

  public  enum approle
    {
        STATIONARY,
        IT

    }


    public class Department
    {
        public string ID { get; set; }
        public string NAME { get; set; }
    }

    public class Material
    {
        public int ID { get; set; }
        public string ITEMS_DESCRIPTION { get; set; }
        public string STATUS { get; set; }
        public string CREATED_DATE { get; set; }
        public string TYPE { get; set; }
        public string ITEMCODE { get; set; }
        public string APPTYPE { get; set; }
    }
    public class listofdropdown
    {
        public List<Company> Company { get; set; }
        public List<Material> Material { get; set; }
        public List<Units> Unit { get; set; }
    }

    public class Company
    {
        public int ID { get; set; }
        public string COMPANYNAME { get; set; }
        public string STATUS { get; set; }
        public string CREATED_DATE { get; set; }


    }
    public class Units
    {
        public int ID { get; set; }
        public string UNITS_DESCRIPTION { get; set; }
        public string STATUS { get; set; }
        public string CREATED_DATE { get; set; }
      

    }
   

    public class SubCategory
    {
        public int ID { get; set; }
        public string DESCRIPTION { get; set; }
        public string STATUS { get; set; }
        public string CREATED_DATE { get; set; }
       public string PARENT_ID { get; set; }
        public string CHILDITEMCODE { get; set; }
        public string CATEGORYTYPE { get; set; }
    }

   
    public class orderreceived
    {
        public int ID { get; set; }
        public string ITEMID { get; set; }
        public string TIMEOFRECEIVED { get; set; }
        public DateTime DATEOFRECEIVED { get; set; }
        public string TOTAL_ITEM_RECEIVED { get; set; }
        public string STATUS {get;set;}

    }
    public class StationaryRepository
    {
        public int ID { get; set; }
        public string CATEGORY { get; set; }
        public string COMPANY { get; set; }
        public string ESTIMATED_QUANTITY { get; set; }
        public string UNIT { get; set; }
        public string BASIC_AMOUNT { get; set; }
        public string GST { get; set; }
        public string TOTAL_ITEM_ORDER { get; set; }
        public string TOTAL_ITEM_RECEIVED { get; set; }
        public DateTime DATEOFRECEIVED { get; set; }
        public DateTime DATEOFORDER { get; set; }
        public string SUBCATEGORY { get; set; }
        public string TIMEOFORDER { get; set; }
        public string TIMEOFRECEIVED { get; set; }
        public string SUBCHILDCATEGORY { get; set; }
        public List<orderreceived> ORDERRECEIVED { get;set;}
        public string STATUS { get; set; }
    }
    public class DGHUserRepository
    {
        public int ID { get; set; }
        public string CATEGORY { get; set; }
        public string EMPLOYEE { get; set; }
        public string EMPLOYEE_STATUS { get; set; }
        public DateTime DATE_OF_RECEIPT { get; set; }
        public string QUANTITY { get; set; }
        public DateTime DATE_OF_ISSUE { get; set; }
        public string ISSUER { get; set; }
        public string REMARK { get; set; }
        public string DEPT_ID { get; set; }
        public string STATUS { get; set; }
        public string CREATED_DATE { get; set; }
        public string SUBCATEGORY { get; set; }
        public string SUBCHILDCATEGORY { get; set; }


    }

    public class PrintRepository
    {
        public int ID { get; set; }
        public string CATEGORY { get; set; }
        public string BRAND { get; set; }
        public string ANNUAL_REQUIREMENT { get; set; }
        public string UNIT { get; set; }
        public string RATE { get; set; }
        public string GST_RATE { get; set; }
        public string GST_AMOUNT { get; set; }
    
        public string TOTAL_ITEM_ORDER { get; set; }
        public string TOTAL_ITEM_RECEIVED { get; set; }
        public DateTime DATEOFRECEIVED { get; set; }
        public DateTime DATEOFORDER { get; set; }
        public string SUBCATEGORY { get; set; }
        public string TIMEOFORDER { get; set; }
        public string TIMEOFRECEIVED { get; set; }
        public string SUBCHILDCATEGORY { get; set; }
        public List<orderreceived> ORDERRECEIVED { get; set; }
        public string STATUS { get; set; }

    }

    public class getstock
    {
        public string CATEGORY { get; set; }
        public string SUBCATEGORY { get; set; }
        public string SUBCHILDCATEGORY { get; set; }
    }
   public class Report
    {
        public int ID { get; set; }
        public string CATEGORY { get; set; }
        public string EMPLOYEE { get; set; }
        public string EMPLOYEE_STATUS { get; set; }
        public string SUBCATEGORY { get; set; }
        public string SUBCHILDCATEGORY { get; set; }
        public string IN_STOCK { get; set; }
        public string CONSUME { get; set; }
        public List<DGHUserRepository> Dghuser { get; set; }
        public string YEARDATE { get; set; }

        public DateTime DATEOFISSUE { get; set; }
        public DateTime? FROM_DATE { get; set; }
        public DateTime? TO_DATE { get; set; }
        public string DEPTID { get; set; }

    }


    public class UsersDgh
    {
     public int ID { get; set; }
        public string USERNAME { get; set; }
        public string EMAILID { get; set; }
        public string PHONENO { get; set; }
        public string DEPTID { get; set; }
        public string STATUS { get; set; }
        public string PASSWORD { get; set; }
        public string CREATED_DATE { get; set; }
    }


    public class Contract
    {
        public int ID { get; set; }
        public string CONTRACTNO { get; set; }
        public string VENDORNAME { get; set; }
        public DateTime STARTDATE { get; set; }
        public DateTime ENDDATE { get; set; }
        public string STATUS { get; set; }
        public string CREATED_DATE { get; set; }

        public List<ititems> ORDERITEM { get; set; }
    }


    public class ititems
    {
        public int ID { get; set; }
        public string CATEGORY { get; set; }
        public string SUBCATEGORY { get; set; }
        public string SUBCHILDCATEGORY { get; set; }
        public string STATUS { get; set; }
        public string CREATED_DATE { get; set; }
    }


    public class devicename

    {
        public int ID { get; set; }
        public string DEVICENAME { get; set; }
        public string STATUS { get; set; }
        public string CREATED_DATE { get; set; }

    }
    public class UserIDROLEID

    {
        public string UserID { get; set; }
        public string ROLEID { get; set; }
    }


    }
