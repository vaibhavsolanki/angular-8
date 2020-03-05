using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace stationaryr.Models
{
    public static class ApplicationPermissions
    {
        public static ReadOnlyCollection<ApplicationPermission> AllPermissions;


    public const string UsersPermissionGroupName = "User Permissions";
    public static ApplicationPermission ViewUsers = new ApplicationPermission("Stationary","View Users", "userssta.view", UsersPermissionGroupName, "Permission to view other users account details");
    public static ApplicationPermission ManageUsers = new ApplicationPermission("Stationary","Manage Users", "userssta.manage", UsersPermissionGroupName, "Permission to create, delete and modify other users account details");

    public const string RolesPermissionGroupName = "Role Permissions";
    public static ApplicationPermission ViewRoles = new ApplicationPermission("Stationary","View Roles", "rolessta.view", RolesPermissionGroupName, "Permission to view available roles");
    public static ApplicationPermission ManageRoles = new ApplicationPermission("Stationary","Manage Roles", "rolessta.manage", RolesPermissionGroupName, "Permission to create, delete and modify roles");
    public static ApplicationPermission AssignRoles = new ApplicationPermission("Stationary","Assign Roles", "rolessta.assign", RolesPermissionGroupName, "Permission to assign roles to users");

        public const string CategoryPermissionGroupName = "Category Permissions";
        public static ApplicationPermission ViewCategory = new ApplicationPermission("Stationary","View Category", "categorysta.view", CategoryPermissionGroupName, "Permission to view available category");
        public static ApplicationPermission ManageCategory = new ApplicationPermission("Stationary","Manage Category", "categorysta.manage", CategoryPermissionGroupName, "Permission to create, delete and modify category");

        public const string SubCategoryPermissionGroupName = "SubCategory Permissions";
        public static ApplicationPermission ViewSubCategory = new ApplicationPermission("Stationary","View SubCategory", "subcategorysta.view", SubCategoryPermissionGroupName, "Permission to view available subcategory");
        public static ApplicationPermission ManageSubCategory = new ApplicationPermission("Stationary","Manage SubCategory", "subcategorysta.manage", SubCategoryPermissionGroupName, "Permission to create, delete and modify subcategory");

        public const string SubChildCategoryPermissionGroupName = "SubChildCategory Permissions";
        public static ApplicationPermission ViewSubChildategory = new ApplicationPermission("Stationary","View SubChildCategory", "subchildcategorysta.view", SubChildCategoryPermissionGroupName, "Permission to view available category");
        public static ApplicationPermission ManageSubChildCategory = new ApplicationPermission("Stationary","Manage SubChildCategory", "subchildcategorysta.manage", SubChildCategoryPermissionGroupName, "Permission to create, delete and modify subchildcategory");

        public const string UnitPermissionGroupName = "Unit Permissions";
        public static ApplicationPermission ViewUnit = new ApplicationPermission("Stationary", "View Unit", "unitsta.view", UnitPermissionGroupName, "Permission to view available Unit");
        public static ApplicationPermission ManageUnit = new ApplicationPermission("Stationary", "Manage Unit", "unitsta.manage", UnitPermissionGroupName, "Permission to create, delete and modify Unit");


        public const string ItemCodePermissionGroupName = "Itemcode Permissions";
        public static ApplicationPermission Viewitemcode = new ApplicationPermission("Stationary", "View Item Code", "itemcodesta.view", ItemCodePermissionGroupName, "Permission to view available itemcode");
        public static ApplicationPermission Manageitemcode = new ApplicationPermission("Stationary", "Manage Item Code", "itemcodesta.manage", ItemCodePermissionGroupName, "Permission to create, delete and modify itemcode");

        public const string StationaryRepPermissionGroupName = "StationaryRep Permissions";
        public static ApplicationPermission ViewStationaryRep = new ApplicationPermission("Stationary", "View Stationary Repository", "stationaryrepsta.view", StationaryRepPermissionGroupName, "Permission to view available stationaryrep");
        public static ApplicationPermission ManageStationaryRep = new ApplicationPermission("Stationary", "Manage Stationary Repository", "stationaryrepsta.manage", StationaryRepPermissionGroupName, "Permission to create, delete and modify stationaryrep");

        public const string PrintRepPermissionGroupName = "PrintRep Permissions";
        public static ApplicationPermission ViewPrintRep = new ApplicationPermission("Stationary", "View Print Repository", "printsta.view", PrintRepPermissionGroupName, "Permission to view available printrep");
        public static ApplicationPermission ManagePrintRep = new ApplicationPermission("Stationary", "Manage Print Repository", "printsta.manage", PrintRepPermissionGroupName, "Permission to create, delete and modify printrep");


        public const string ReportStaPermissionGroupName = "Report Permissions";
        public static ApplicationPermission ViewReportSta = new ApplicationPermission("Stationary", "View Report Repository", "reportsta.view", ReportStaPermissionGroupName, "Permission to view available printrep");
        public static ApplicationPermission ManageReportSta = new ApplicationPermission("Stationary", "Manage Report Repository", "reportsta.manage", ReportStaPermissionGroupName, "Permission to create, delete and modify printrep");




        //------//

        public const string UsersItPermissionGroupName = "User Permissions";
        public static ApplicationPermission ViewItUsers = new ApplicationPermission("IT", "View Users", "usersit.view", UsersItPermissionGroupName, "Permission to view other users account details");
        public static ApplicationPermission ManageItUsers = new ApplicationPermission("IT", "Manage Users", "usersit.manage", UsersItPermissionGroupName, "Permission to create, delete and modify other users account details");

        public const string RolesItPermissionGroupName = "Role Permissions";
        public static ApplicationPermission ViewItRoles = new ApplicationPermission("IT", "View Roles", "rolesit.view", RolesItPermissionGroupName, "Permission to view available roles");
        public static ApplicationPermission ManageItRoles = new ApplicationPermission("IT", "Manage Roles", "rolesit.manage", RolesItPermissionGroupName, "Permission to create, delete and modify roles");
        public static ApplicationPermission AssignItRoles = new ApplicationPermission("IT", "Assign Roles", "rolesit.assign", RolesItPermissionGroupName, "Permission to assign roles to users");

        public const string CategoryItPermissionGroupName = "Category Permissions";
        public static ApplicationPermission ViewItCategory = new ApplicationPermission("IT", "View Category", "categoryit.view", CategoryItPermissionGroupName, "Permission to view available category");
        public static ApplicationPermission ManageItCategory = new ApplicationPermission("IT", "Manage Category", "categoryit.manage", CategoryItPermissionGroupName, "Permission to create, delete and modify category");

        public const string SubCategoryItPermissionGroupName = "SubCategory Permissions";
        public static ApplicationPermission ViewItSubCategory = new ApplicationPermission("IT", "View SubCategory", "subcategoryit.view", SubCategoryItPermissionGroupName, "Permission to view available subcategory");
        public static ApplicationPermission ManageItSubCategory = new ApplicationPermission("IT", "Manage SubCategory", "subcategoryit.manage", SubCategoryItPermissionGroupName, "Permission to create, delete and modify subcategory");

        public const string SubChildCategoryItPermissionGroupName = "SubChildCategory Permissions";
        public static ApplicationPermission ViewItSubChildategory = new ApplicationPermission("IT", "View SubChildCategory", "subchildcategoryit.view", SubChildCategoryItPermissionGroupName, "Permission to view available subchildcategory");
        public static ApplicationPermission ManageItSubChildCategory = new ApplicationPermission("IT", "Manage SubChildCategory", "subchildcategoryit.manage", SubChildCategoryItPermissionGroupName, "Permission to create, delete and modify subchildcategory");

        public const string ContractItPermissionGroupName = "Contract Permissions";
        public static ApplicationPermission ViewItContract = new ApplicationPermission("IT", "View Contract", "contractit.view", ContractItPermissionGroupName, "Permission to view available contract");
        public static ApplicationPermission ManageItContract = new ApplicationPermission("IT", "Manage Contract", "contractit.manage", ContractItPermissionGroupName, "Permission to create, delete and modify contract");

        public const string DeviceItPermissionGroupName = "Device Permissions";
        public static ApplicationPermission ViewItDevice = new ApplicationPermission("IT", "View Device", "deviceit.view", DeviceItPermissionGroupName, "Permission to view available device");
        public static ApplicationPermission ManageItDevice = new ApplicationPermission("IT", "Manage Device", "deviceit.manage", DeviceItPermissionGroupName, "Permission to create, delete and modify device");

        public const string PublishContractItPermissionGroupName = "Publish Contract";
        public static ApplicationPermission ViewItPublishContract = new ApplicationPermission("IT", "View PublishContract", "publishcontractit.view", PublishContractItPermissionGroupName, "Permission to view available PublishContracti");
        public static ApplicationPermission ManageItPublishContract = new ApplicationPermission("IT", "Manage PublishContract", "publishcontractit.manage", PublishContractItPermissionGroupName, "Permission to create, delete and modify PublishContracti");

        public const string ReceiptOfItemItPermissionGroupName = "Receipt Items";
        public static ApplicationPermission ViewItReceiptOfItem = new ApplicationPermission("IT", "View ReceiptOfItems", "receiptofitemsit.view", ReceiptOfItemItPermissionGroupName, "Permission to view available Receipt Of Item");
        public static ApplicationPermission ManageItReceiptOfItem = new ApplicationPermission("IT", "Manage ReceiptOfItems", "receiptofitemsit.manage", ReceiptOfItemItPermissionGroupName, "Permission to create, delete and modify Receipt Of Item");


        public const string ItVendors = "Vendor";
        public static ApplicationPermission ViewItVendor = new ApplicationPermission("IT", "View Vendor", "vendorsit.view", ItVendors, "Permission to view available Vendor");
        public static ApplicationPermission ManageItVendor = new ApplicationPermission("IT", "Manage Vendor", "vendorsit.manage", ItVendors, "Permission to create, delete and modify Vendor");


        public const string ItIssueItems = "Issue Items";
        public static ApplicationPermission ViewItIssueItem = new ApplicationPermission("IT", "View IssueItem", "issueitemit.view", ItIssueItems, "Permission to view available IssueItem");
        public static ApplicationPermission ManageItIssueItem = new ApplicationPermission("IT", "Manage IssueItem", "issueitemit.manage", ItIssueItems, "Permission to create, delete and modify IssueItem");


        public const string ItRequestItems = "Request Items";
        public static ApplicationPermission ViewItRequestItem = new ApplicationPermission("IT", "View RequestItemit", "requestitemit.view", ItRequestItems, "Permission to view available RequestItemit");
        public static ApplicationPermission ManageItRequrstItem = new ApplicationPermission("IT", "Manage RequestItemit", "requestitemit.manage", ItRequestItems, "Permission to create, delete and modify RequestItemit");

        static ApplicationPermissions()
    {
        List<ApplicationPermission> allPermissions = new List<ApplicationPermission>()
            {
                ViewUsers,
                ManageUsers,

                ViewRoles,
                ManageRoles,
                AssignRoles,
                ViewCategory,
                ManageCategory,
                ViewSubCategory,
                ManageSubCategory,
                ViewSubChildategory,
                ManageSubChildCategory,
                ViewUnit,
                ManageUnit,
                Viewitemcode,
                Manageitemcode,
                ViewStationaryRep,
                ManageStationaryRep,
                ViewPrintRep,
                ManagePrintRep,
                ViewReportSta,
                ManageReportSta,



                 ViewItUsers,
                ManageItUsers,

                ViewItRoles,
                ManageItRoles,
                AssignItRoles,
                ViewItCategory,
                ManageItCategory,
                ViewItSubCategory,
                ManageItSubCategory,
                ViewItSubChildategory,
                ManageItSubChildCategory,
                ViewItContract,
                ManageItContract,
                ViewItDevice,
                ManageItDevice,
                ViewItPublishContract,
                ManageItPublishContract,
                ViewItReceiptOfItem,
                ManageItReceiptOfItem,
                ViewItVendor,
                ManageItVendor,
                ViewItIssueItem,
                ManageItIssueItem,
                ViewItRequestItem,
                ManageItRequrstItem
            };

        AllPermissions = allPermissions.AsReadOnly();
    }

    public static ApplicationPermission GetPermissionByName(string permissionName)
    {
        return AllPermissions.Where(p => p.Name == permissionName).SingleOrDefault();
    }

    public static ApplicationPermission GetPermissionByValue(string permissionValue)
    {
        return AllPermissions.Where(p => p.Value == permissionValue).SingleOrDefault();
    }

    public static string[] GetAllPermissionValues()
    {
        return AllPermissions.Select(p => p.Value).ToArray();
    }

    public static string[] GetAdministrativePermissionValues()
    {
        return new string[] { ManageUsers, ManageRoles, AssignRoles };
    }
}



public class ApplicationPermission
{
    public ApplicationPermission()
    { }

    public ApplicationPermission(string applicationtype,string name, string value, string groupName, string description = null)
    {
            ApplicationType = applicationtype;
        Name = name;
        Value = value;
        GroupName = groupName;
        Description = description;
    }



    public string Name { get; set; }
    public string Value { get; set; }
    public string GroupName { get; set; }
    public string Description { get; set; }

    public string ApplicationType { get; set; }

        public override string ToString()
    {
        return Value;
    }


    public static implicit operator string(ApplicationPermission permission)
    {
        return permission.Value;
    }
}
}
