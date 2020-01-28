var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./User"], function (require, exports, User_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserEdit = /** @class */ (function (_super) {
        __extends(UserEdit, _super);
        function UserEdit(currentPassword, newPassword, confirmPassword) {
            var _this = _super.call(this) || this;
            _this.CurrentPassword = currentPassword;
            _this.NewPassword = newPassword;
            _this.ConfirmPassword = confirmPassword;
            return _this;
        }
        return UserEdit;
    }(User_1.User));
    exports.UserEdit = UserEdit;
});
//# sourceMappingURL=edit-user.modal.js.map