"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        //private actionUrl: string = "http://192.168.0.42/";
        this.actionUrl = "https://localhost:44324/";
        this.currentUserSubject = new rxjs_1.BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    Object.defineProperty(AuthenticationService.prototype, "currentUserValue", {
        get: function () {
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var logindata = {
            username: username,
            passward: password
        };
        return this.http.post(this.actionUrl + "WeatherForecast/logincheck", logindata, httpOptions).pipe(operators_1.map(function (user) {
            return _this.processLoginResponse(user);
        }));
    };
    AuthenticationService.prototype.processLoginResponse = function (response) {
        localStorage.setItem('currentUser', JSON.stringify(response.username));
        localStorage.setItem('currentRole', JSON.stringify(response.role));
        localStorage.setItem('auth_token', JSON.stringify(response.token));
        this.currentUserSubject.next(response);
        return response;
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentRole');
        localStorage.removeItem('auth_token');
        this.currentUserSubject.next(null);
    };
    AuthenticationService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map