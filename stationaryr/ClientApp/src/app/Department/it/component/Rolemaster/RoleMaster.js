"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var role_modal_1 = require("../../../../modal/role.modal");
var forms_1 = require("@angular/forms");
var Rolemaster = /** @class */ (function () {
    function Rolemaster(formbuilder, Componentservices, router) {
        this.formbuilder = formbuilder;
        this.Componentservices = Componentservices;
        this.router = router;
        this.Role = new role_modal_1.Role();
        this.btnvisibility = true;
        this.submitted = false;
        this.loading = false;
        this.allPermissions = [];
        this.pp = [];
        this.panelOpenState = false;
        this.selectedValues = {};
    }
    Rolemaster.prototype.ngOnInit = function () {
        var _this = this;
        this.panelOpenState = true;
        if (this.link1 == undefined) {
            this.routelink = "GetRolemaster";
            this.editroutelink = "IT/GetRolemaster";
        }
        else {
            this.routelink = this.link1;
            this.editroutelink = "stationary/" + this.link1;
        }
        this.getUserPreferences();
        this.RoleForm = this.formbuilder.group({
            Name: ['', forms_1.Validators.required],
            Description: [],
            Permissions: this.formbuilder.array([])
        });
        var empid = localStorage.getItem('editRoleId');
        if (empid != null) {
            this.Componentservices.GetRoleByName(empid).subscribe(function (data) {
                _this.Role = data,
                    console.log(_this.Role),
                    _this.RoleForm.controls['Name'].setValue(_this.Role.Name);
                _this.RoleForm.controls['Description'].setValue(_this.Role.Description);
            });
            this.btnvisibility = false;
        }
    };
    Rolemaster.prototype.onCheckboxChange = function (e) {
        var _this = this;
        var Permissions = this.RoleForm.get('Permissions');
        if (e.target.checked) {
            Permissions.push(new forms_1.FormControl(e.target.value));
            this.pp.push(e.target.value);
        }
        else {
            var i_1 = 0;
            Permissions.controls.forEach(function (item) {
                if (item.value == e.target.value) {
                    Permissions.removeAt(i_1);
                    _this.pp.indexOf(e.target.value);
                    return;
                }
                i_1++;
            });
        }
    };
    Rolemaster.prototype.getUserPreferences = function () {
        var _this = this;
        return this.Componentservices.getpermission().subscribe(function (data) {
            _this.allPermissions = data;
            console.log(_this.allPermissions);
        });
    };
    Rolemaster.prototype.selectAll = function () {
        var _this = this;
        this.allPermissions.forEach(function (p) { return _this.selectedValues[p.Value] = true; });
    };
    Rolemaster.prototype.selectNone = function () {
        var _this = this;
        this.allPermissions.forEach(function (p) { return _this.selectedValues[p.Value] = false; });
    };
    Rolemaster.prototype.toggleGroup = function (groupName) {
        var _this = this;
        var firstMemberValue;
        this.allPermissions.forEach(function (p) {
            if (p.GroupName != groupName) {
                return;
            }
            if (firstMemberValue == null) {
                firstMemberValue = _this.selectedValues[p.Value] == true;
            }
            _this.selectedValues[p.Value] = !firstMemberValue;
        });
    };
    Object.defineProperty(Rolemaster.prototype, "f", {
        get: function () { return this.RoleForm.controls; },
        enumerable: true,
        configurable: true
    });
    Rolemaster.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        if (this.RoleForm.invalid) {
            return;
        }
        this.loading = true;
        console.log(this.pp);
        this.Role.Permissions = this.allPermissions.filter(function (x) { return !!_this.pp.includes(x.Value); });
        this.Componentservices
            .Saverole(this.RoleForm.value, this.Role.Permissions)
            .subscribe(function (data) { _this.datasubmit = data, alert(_this.datasubmit), _this.loading = false; console.log(_this.datasubmit); _this.router.navigate([_this.editroutelink]); }, function (error) { return function () {
        }; }, function () { return console.log(_this.datasubmit); });
    };
    Rolemaster.prototype.getSelectedPermissions = function (value) {
        var _this = this;
        return this.allPermissions.filter(function (p) { return _this.selectedValues[value] == true; });
        //.filter(p => this.selectedValues[p.value] == true)
    };
    Rolemaster.prototype.onUpdate = function () {
        this.submitted = true;
        if (this.RoleForm.invalid) {
            return;
        }
        this.loading = true;
        // this.Componentservices
        //   .Updateusers(this.UsersForm.value)
        //    .subscribe(data => { this.users = data, alert(this.users), this.loading = false; console.log(this.users); this.router.navigate([this.editroutelink]); },
        //         error => () => {
        //         },
        //     () => console.log(this.users)
        //     );
    };
    __decorate([
        core_1.Input()
    ], Rolemaster.prototype, "link1", void 0);
    Rolemaster = __decorate([
        core_1.Component({
            selector: 'app-role-master',
            templateUrl: './Rolemaster.html',
        })
    ], Rolemaster);
    return Rolemaster;
}());
exports.Rolemaster = Rolemaster;
//# sourceMappingURL=RoleMaster.js.map