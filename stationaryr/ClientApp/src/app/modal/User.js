define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var User = /** @class */ (function () {
        // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
        function User(id, userName, fullName, email, jobTitle, phoneNumber, roles) {
            this.Roles = [];
            this.Id = id;
            this.UserName = userName;
            this.FullName = fullName;
            this.Email = email;
            this.JobTitle = jobTitle;
            this.PhoneNumber = phoneNumber;
            this.Roles = roles;
        }
        Object.defineProperty(User.prototype, "friendlyName", {
            get: function () {
                var name = this.FullName || this.UserName;
                if (this.JobTitle) {
                    name = this.JobTitle + ' ' + name;
                }
                return name;
            },
            enumerable: true,
            configurable: true
        });
        return User;
    }());
    exports.User = User;
});
//# sourceMappingURL=User.js.map