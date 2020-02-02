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
    public static ApplicationPermission ViewUsers = new ApplicationPermission("Stationary","View Users", "users.view", UsersPermissionGroupName, "Permission to view other users account details");
    public static ApplicationPermission ManageUsers = new ApplicationPermission("Stationary","Manage Users", "users.manage", UsersPermissionGroupName, "Permission to create, delete and modify other users account details");

    public const string RolesPermissionGroupName = "Role Permissions";
    public static ApplicationPermission ViewRoles = new ApplicationPermission("Stationary","View Roles", "roles.view", RolesPermissionGroupName, "Permission to view available roles");
    public static ApplicationPermission ManageRoles = new ApplicationPermission("Stationary","Manage Roles", "roles.manage", RolesPermissionGroupName, "Permission to create, delete and modify roles");
    public static ApplicationPermission AssignRoles = new ApplicationPermission("Stationary","Assign Roles", "roles.assign", RolesPermissionGroupName, "Permission to assign roles to users");

        public const string CategoryPermissionGroupName = "Category Permissions";
        public static ApplicationPermission ViewCategory = new ApplicationPermission("Stationary","View Category", "category.view", CategoryPermissionGroupName, "Permission to view available category");
        public static ApplicationPermission ManageCategory = new ApplicationPermission("Stationary","Manage Category", "category.manage", CategoryPermissionGroupName, "Permission to create, delete and modify category");

        public const string SubCategoryPermissionGroupName = "SubCategory Permissions";
        public static ApplicationPermission ViewSubCategory = new ApplicationPermission("Stationary","View SubCategory", "subcategory.view", SubCategoryPermissionGroupName, "Permission to view available subcategory");
        public static ApplicationPermission ManageSubCategory = new ApplicationPermission("Stationary","Manage SubCategory", "subcategory.manage", SubCategoryPermissionGroupName, "Permission to create, delete and modify subcategory");

        public const string SubChildCategoryPermissionGroupName = "SubChildCategory Permissions";
        public static ApplicationPermission ViewSubChildategory = new ApplicationPermission("Stationary","View SubChildCategory", "subchildcategory.view", SubChildCategoryPermissionGroupName, "Permission to view available category");
        public static ApplicationPermission ManageSubChildCategory = new ApplicationPermission("Stationary","Manage SubChildCategory", "subchildcategory.manage", SubChildCategoryPermissionGroupName, "Permission to create, delete and modify subchildcategory");
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
        public static ApplicationPermission ViewItSubChildategory = new ApplicationPermission("IT", "View SubChildCategory", "subchildcategoryit.view", SubChildCategoryItPermissionGroupName, "Permission to view available category");
        public static ApplicationPermission ManageItSubChildCategory = new ApplicationPermission("IT", "Manage SubChildCategory", "subchildcategoryit.manage", SubChildCategoryItPermissionGroupName, "Permission to create, delete and modify subchildcategory");

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
                ManageItSubChildCategory


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
