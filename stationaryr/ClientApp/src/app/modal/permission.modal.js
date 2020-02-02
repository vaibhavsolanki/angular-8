// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Permission = /** @class */ (function () {
        function Permission(AplicationType, Name, Value, GroupName, Description) {
            this.AplicationType = AplicationType;
            this.Name = Name;
            this.Value = Value;
            this.GroupName = GroupName;
            this.Description = Description;
        }
        Permission.viewUsersPermission = 'users.view';
        Permission.manageUsersPermission = 'users.manage';
        Permission.viewRolesPermission = 'roles.view';
        Permission.manageRolesPermission = 'roles.manage';
        Permission.assignRolesPermission = 'roles.assign';
        Permission.viewCatogoryPermission = 'category.view';
        Permission.manageCategoryPermission = 'category.manage';
        Permission.viewSubCatogoryPermission = 'subcategory.view';
        Permission.manageSubCategoryPermission = 'subcategory.manage';
        Permission.viewSubChildCatogoryPermission = 'subchildcategory.view';
        Permission.manageSubChildCategoryPermission = 'subchildcategory.manage';
        //
        Permission.viewUsersItPermission = 'usersit.view';
        Permission.manageUsersItPermission = 'usersit.manage';
        Permission.viewRolesItPermission = 'rolesit.view';
        Permission.manageRolesItPermission = 'rolesit.manage';
        Permission.assignRolesItPermission = 'rolesit.assign';
        Permission.viewCatogoryItPermission = 'categoryit.view';
        Permission.manageCategoryItPermission = 'categoryit.manage';
        Permission.viewSubCatogoryItPermission = 'subcategoryit.view';
        Permission.manageSubCategoryItPermission = 'subcategoryit.manage';
        Permission.viewSubChildCatogoryItPermission = 'subchildcategoryit.view';
        Permission.manageSubChildCategoryItPermission = 'subchildcategoryit.manage';
        return Permission;
    }());
    exports.Permission = Permission;
});
//# sourceMappingURL=permission.modal.js.map