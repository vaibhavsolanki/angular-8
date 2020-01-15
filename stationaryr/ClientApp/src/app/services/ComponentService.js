"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Headers': 'http://localhost:4200' })
};
var ComponentService = /** @class */ (function () {
    //private actionUrl: string='http://localhost/POMS/oalp/getdata';
    function ComponentService(httpclient, route) {
        this.httpclient = httpclient;
        this.route = route;
        this.actionUrl = "https://localhost:44384/";
    }
    //report
    ComponentService.prototype.GetStock = function (Category, SubCategory, SubChildCategory) {
        var body = {
            'Category': Category,
            'SubCategory': SubCategory,
            'SubChildCategory': SubChildCategory
        };
        return this.httpclient.post(this.actionUrl + "api/Data/GetStock", body);
    };
    ComponentService.prototype.dghreport = function (Report) {
        return this.httpclient.post(this.actionUrl + "api/Data/dghreport", Report);
    };
    //department
    // employee
    ComponentService.prototype.dghemployee = function () {
        return this.httpclient.post(this.actionUrl + "api/Data/dghemployee", null);
    };
    //dghuser
    ComponentService.prototype.SaveDghuser_Repository = function (DGHUserRepository) {
        return this.httpclient.post(this.actionUrl + "api/Data/SaveDghuser_Repository", DGHUserRepository);
    };
    ComponentService.prototype.deleteDghuser_Repository = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/deleteDghuser_Repository/" + id);
    };
    ComponentService.prototype.getDGHuser_RepositoryId = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/getDGHuser_RepositoryId/" + id);
    };
    ComponentService.prototype.UpdateDghuser_Repository = function (DGHUserRepository) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        DGHUserRepository.ID = Number(firstParam);
        return this.httpclient.post(this.actionUrl + "api/Data/UpdateDghuser_Repository", DGHUserRepository);
    };
    ComponentService.prototype.GetDGHuser_Repository = function () {
        return this.httpclient.post(this.actionUrl + "api/Data/GetDGHuser_Repository", null);
    };
    //print Repository
    ComponentService.prototype.SavePrint_Repository = function (PrintRepository) {
        return this.httpclient.post(this.actionUrl + "api/Data/SavePrint_Repository", PrintRepository);
    };
    ComponentService.prototype.deletePrint_Repository = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/deletePrint_Repository/" + id);
    };
    ComponentService.prototype.getPrint_RepositoryId = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/getPrint_RepositoryId/" + id);
    };
    ComponentService.prototype.UpdatePrint_Repository = function (PrintRepository) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        PrintRepository.ID = Number(firstParam);
        return this.httpclient.post(this.actionUrl + "api/Data/UpdatePrint_Repository", PrintRepository);
    };
    ComponentService.prototype.GetPrint_Repository = function () {
        return this.httpclient.post(this.actionUrl + "api/Data/GetPrint_Repository", null);
    };
    //stationary Repository
    ComponentService.prototype.SaveStationary_Repository = function (StationaryRepository) {
        return this.httpclient.post(this.actionUrl + "api/Data/SaveStationary_Repository", StationaryRepository);
    };
    ComponentService.prototype.deleteStationary_Repository = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/deleteStationary_Repository/" + id);
    };
    ComponentService.prototype.getStationary_RepositoryId = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/getStationary_RepositoryId/" + id);
    };
    ComponentService.prototype.UpdateStationary_Repository = function (StationaryRepository) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        StationaryRepository.ID = Number(firstParam);
        return this.httpclient.post(this.actionUrl + "api/Data/UpdateStationary_Repository", StationaryRepository);
    };
    ComponentService.prototype.GetStationary_Repository = function () {
        return this.httpclient.post(this.actionUrl + "api/Data/GetStationary_Repository", null);
    };
    //material
    ComponentService.prototype.GetMaterial = function () {
        return this.httpclient.post(this.actionUrl + "api/Data/GetMaterial", null);
    };
    ComponentService.prototype.GetMaterialforstaOrprint = function (str) {
        return this.httpclient.get(this.actionUrl + "api/Data/GetMaterialforstaOrprint/" + str);
    };
    ComponentService.prototype.Getsubcategoryonchange = function (str) {
        return this.httpclient.get(this.actionUrl + "api/Data/Getsubcategoryonchange/" + str);
    };
    ComponentService.prototype.SaveMaterial = function (Material) {
        return this.httpclient.post(this.actionUrl + "api/Data/MaterialSave", Material);
    };
    ComponentService.prototype.deletematerial = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/deleteMaterial/" + id);
    };
    ComponentService.prototype.getmaterialId = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/GetmaterialID/" + id);
    };
    ComponentService.prototype.UpdateMaterial = function (Material) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        Material.ID = Number(firstParam);
        return this.httpclient.post(this.actionUrl + "api/Data/MaterialUpdate", Material);
    };
    //Company
    ComponentService.prototype.GetCompany = function () {
        return this.httpclient.post(this.actionUrl + "api/Data/GetCompany", null);
    };
    ComponentService.prototype.SaveCompany = function (company) {
        return this.httpclient.post(this.actionUrl + "api/Data/SaveCompany", company);
    };
    ComponentService.prototype.deletecompany = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/deletecompany/" + id);
    };
    ComponentService.prototype.getcompanyId = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/getcompanyId/" + id);
    };
    ComponentService.prototype.Updatecompany = function (company) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        company.ID = Number(firstParam);
        return this.httpclient.post(this.actionUrl + "api/Data/Updatecompany", company);
    };
    //units
    ComponentService.prototype.GetUnits = function () {
        return this.httpclient.post(this.actionUrl + "api/Data/GetUnits", null);
    };
    ComponentService.prototype.SaveUnits = function (units) {
        return this.httpclient.post(this.actionUrl + "api/Data/SaveUnits", units);
    };
    ComponentService.prototype.deleteunits = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/deleteunits/" + id);
    };
    ComponentService.prototype.getunitsId = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/getunitsId/" + id);
    };
    ComponentService.prototype.Updateunits = function (units) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        units.ID = Number(firstParam);
        return this.httpclient.post(this.actionUrl + "api/Data/Updateunits", units);
    };
    //subcategory
    ComponentService.prototype.GetCategoryDropdown = function (id) {
        return this.httpclient.get(this.actionUrl + "api/Data/GetCategoryDropdown/" + id);
    };
    ComponentService.prototype.GetSubcategory = function (id) {
        //let body = {
        //    'str': str
        //}
        return this.httpclient.get(this.actionUrl + "api/Data/GetSubcategory/" + id);
    };
    ComponentService.prototype.SaveSubcategory = function (Subcategory) {
        return this.httpclient.post(this.actionUrl + "api/Data/SaveSubcategory", Subcategory);
    };
    ComponentService.prototype.deleteSubcategory = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/deleteSubcategory/" + id);
    };
    ComponentService.prototype.getSubcategoryId = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/getSubcategoryId/" + id);
    };
    ComponentService.prototype.UpdateSubcategory = function (Subcategory) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        Subcategory.ID = Number(firstParam);
        return this.httpclient.post(this.actionUrl + "api/Data/UpdateSubcategory", Subcategory);
    };
    ComponentService = __decorate([
        core_1.Injectable()
    ], ComponentService);
    return ComponentService;
}());
exports.ComponentService = ComponentService;
//# sourceMappingURL=ComponentService.js.map