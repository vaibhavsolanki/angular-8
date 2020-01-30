// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Permission = /** @class */ (function () {
        function Permission(Name, Value, GroupName, Description) {
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
        return Permission;
    }());
    exports.Permission = Permission;
});
//# sourceMappingURL=permission.modal.js.map