"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, authenticationService, route, router) {
        this.formBuilder = formBuilder;
        this.authenticationService = authenticationService;
        this.route = route;
        this.router = router;
        this.submitted = false;
        this.loading = false;
        this.dashboard = false;
        this.show = false;
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(function (data) {
            _this.login = data, console.log(_this.login),
                _this.loading = false;
            if (_this.login.username == "vaibhav") {
                _this.router.navigate([_this.returnUrl]);
                _this.dashboard = true;
                alert("logiing success");
            }
            else {
                alert("logiing not success");
            }
        }, function (error) { return function () {
            _this.loading = false;
        }; }, function () { return console.log(); });
    };
    LoginComponent = __decorate([
        core_1.Component({ templateUrl: 'Login.html', styleUrls: ['./LoginComponent.css'] })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=LoginComponent.js.map