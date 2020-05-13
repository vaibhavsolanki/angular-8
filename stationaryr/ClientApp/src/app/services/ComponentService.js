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
var TableEntityClass_1 = require("../TableEntity/TableEntityClass");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Headers': 'http://localhost:4200' })
};
var ComponentService = /** @class */ (function () {
    //private actionUrl: string='http://localhost/POMS/oalp/getdata';
    function ComponentService(httpclient, route) {
        this.httpclient = httpclient;
        this.route = route;
        //private actionUrl: string = "http://192.168.0.42/";
        this.actionUrl = "https://localhost:44324/";
    }
    //itissueitem
    ComponentService.prototype.GetItIssueItems = function () {
        return this.httpclient.get(this.actionUrl + "api/Data/GetItIssueItems");
    };
    ComponentService.prototype.SaveItIssueItems = function (AdminIssue) {
        console.log(AdminIssue);
        return this.httpclient.post(this.actionUrl + "api/Data/SaveItIssueItems", AdminIssue);
    };
    ComponentService.prototype.DeleteItIssueItems = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/DeleteItIssueItems/" + id);
    };
    ComponentService.prototype.GetItIssueItemsById = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/GetItIssueItemsById/" + id);
    };
    ComponentService.prototype.UpdateIssueItems = function (AdminIssue) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        AdminIssue.ID = firstParam;
        return this.httpclient.post(this.actionUrl + "api/Data/UpdateIssueItems", TableEntityClass_1.itissueitems);
    };
    //ITITEMRECEIPT
    ComponentService.prototype.GetItItemReceipt = function () {
        return this.httpclient.get(this.actionUrl + "api/Data/GetItItemReceipt");
    };
    ComponentService.prototype.SaveItItemReceipt = function (itemreceipt, item) {
        itemreceipt.ORDERITEM = item;
        console.log(itemreceipt.ORDERITEM);
        return this.httpclient.post(this.actionUrl + "api/Data/SaveItItemReceipt", itemreceipt);
    };
    ComponentService.prototype.DeleteItItemReceipt = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/DeleteItItemReceipt/" + id);
    };
    ComponentService.prototype.GetItItemReceiptById = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/GetItItemReceiptById/" + id);
    };
    ComponentService.prototype.UpdateItemReceipt = function (itemreceipt) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        itemreceipt.PUBLISHORDER = firstParam;
        return this.httpclient.post(this.actionUrl + "api/Data/UpdateItemReceipt", itemreceipt);
    };
    //itvendor
    ComponentService.prototype.GetItVendor = function () {
        return this.httpclient.get(this.actionUrl + "api/Data/GetItVendor");
    };
    ComponentService.prototype.SaveItVendor = function (itvendor) {
        itvendor.APPTYPE = 'IT';
        return this.httpclient.post(this.actionUrl + "api/Data/SaveItVendor", itvendor);
    };
    ComponentService.prototype.DeleteItVendor = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/DeleteItVendor/" + id);
    };
    ComponentService.prototype.GetItVendorById = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/GetItVendorById/" + id);
    };
    ComponentService.prototype.UpdateItVendor = function (itvendor) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        itvendor.ID = Number(firstParam);
        itvendor.APPTYPE = 'IT';
        return this.httpclient.post(this.actionUrl + "api/Data/UpdateItVendor", itvendor);
    };
    //itrelease order
    ComponentService.prototype.getreleaseorder = function () {
        return this.httpclient.get(this.actionUrl + "api/Data/getreleaseorder");
    };
    ComponentService.prototype.getreleaseorderbyid = function (id) {
        return this.httpclient.get(this.actionUrl + "api/Data/getreleaseorderbyid/" + id);
    };
    ComponentService.prototype.savereleaseorder = function (order) {
        return this.httpclient.post(this.actionUrl + "api/Data/savereleaseorder", order);
    };
    ComponentService.prototype.deletereleaseorder = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/deletereleaseorder/" + id);
    };
    Object.defineProperty(ComponentService.prototype, "rolebyuser", {
        //report
        get: function () {
            return localStorage.getItem('currentRole');
        },
        enumerable: true,
        configurable: true
    });
    //permission
    //getUserPreferences(): Observable<pe[]> {
    //}
    ComponentService.prototype.getpermission = function () {
        return this.httpclient.get(this.actionUrl + "api/Account/permissions");
    };
    //rolemaster
    ComponentService.prototype.GetRoles = function () {
        return this.httpclient.get(this.actionUrl + "api/Account/roles");
    };
    ComponentService.prototype.Saverole = function (RoleViewModel, permission) {
        RoleViewModel.Permissions = permission;
        console.log(RoleViewModel.Permissions);
        return this.httpclient.post(this.actionUrl + "api/Account/roles", RoleViewModel);
    };
    ComponentService.prototype.deleterole = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Account/roles/" + id);
    };
    ComponentService.prototype.getRoleId = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Account/roles/" + id);
    };
    ComponentService.prototype.GetRoleByName = function (name) {
        var body = {
            'name': name
        };
        return this.httpclient.get(this.actionUrl + "api/Account/roles/name/" + name);
    };
    //public UpdateDevicename(contract: devicename): Observable<string> {
    // const firstParam: string = this.route.snapshot.queryParamMap.get('id')
    //contract.ID = Number(firstParam);
    //return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdateDevicename", contract)
    //}
    //device name
    ComponentService.prototype.GetDevicename = function () {
        return this.httpclient.post(this.actionUrl + "api/Data/GetDevicename", null);
    };
    ComponentService.prototype.SaveDevicename = function (contract) {
        return this.httpclient.post(this.actionUrl + "api/Data/SaveDevicename", contract);
    };
    ComponentService.prototype.deleteDevicename = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/deleteDevicename/" + id);
    };
    ComponentService.prototype.getDevicenameId = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/getDevicenameId/" + id);
    };
    ComponentService.prototype.UpdateDevicename = function (contract) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        contract.ID = Number(firstParam);
        return this.httpclient.post(this.actionUrl + "api/Data/UpdateDevicename", contract);
    };
    //contractform
    ComponentService.prototype.GetContractform = function () {
        return this.httpclient.get(this.actionUrl + "api/Data/GetContractform");
    };
    ComponentService.prototype.SaveContractform = function (contract) {
        return this.httpclient.post(this.actionUrl + "api/Data/SaveContractform", contract);
    };
    ComponentService.prototype.deleteContractform = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/deleteContractform/" + id);
    };
    ComponentService.prototype.getContractformId = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Data/getContractformId/" + id);
    };
    ComponentService.prototype.UpdateContractform = function (contract) {
        var firstParam = this.route.snapshot.queryParamMap.get('id');
        contract.CONTRACTID = firstParam;
        return this.httpclient.post(this.actionUrl + "api/Data/UpdateContractform", contract);
    };
    //users
    ComponentService.prototype.GetUsers = function () {
        return this.httpclient.get(this.actionUrl + "api/Account/users");
    };
    ComponentService.prototype.SaveUsers = function (users) {
        console.log(users);
        return this.httpclient.post(this.actionUrl + "api/Account/Register", users); //, users
    };
    ComponentService.prototype.deleteusers = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Account/deleteusers/" + id);
    };
    ComponentService.prototype.getuserId = function (id) {
        var body = {
            'ID': id
        };
        return this.httpclient.get(this.actionUrl + "api/Account/getuserId/" + id);
    };
    //public Updateusers1(users: UserEdit): Observable<string> {
    //  console.log('narang ');
    //  console.log(users);
    //  console.log('gagan');
    //  var Id = users.Id;
    //  return this.httpclient.get<string>(this.actionUrl + "api/Data/getuserId/"+Id)//, users
    //}
    ComponentService.prototype.Updateusers = function (users) {
        //const firstParam: string = this.route.snapshot.queryParamMap.get('id')
        //users.Id = firstParam;
        console.log(users);
        return this.httpclient.post(this.actionUrl + "api/Account/Updateusers", users);
    };
    ComponentService.prototype.GetStock = function (Category, SubCategory, SubChildCategory) {
        var body = {
            'Category': Category,
            'SubCategory': SubCategory,
            'SubChildCategory': SubChildCategory
        };
        return this.httpclient.post(this.actionUrl + "api/Data/GetStock", body);
    };
    ComponentService.prototype.Deletereceiveditem = function (id) {
        return this.httpclient.delete(this.actionUrl + "api/Data/Deletereceiveditem/" + id);
    };
    ComponentService.prototype.dghreport = function (Report) {
        return this.httpclient.post(this.actionUrl + "api/Data/dghreport", Report);
    };
    //department
    ComponentService.prototype.department = function () {
        return this.httpclient.get(this.actionUrl + "api/Data/department/");
    };
    // employee
    ComponentService.prototype.dghemployee = function (status) {
        return this.httpclient.get(this.actionUrl + "api/Data/dghemployee/" + status);
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
    ComponentService.prototype.GetMaterial = function (status) {
        return this.httpclient.get(this.actionUrl + "api/Data/GetMaterial/" + status);
    };
    ComponentService.prototype.GetMaterialforstaOrprint = function (str) {
        return this.httpclient.get(this.actionUrl + "api/Data/GetMaterialforstaOrprint/" + str);
    };
    ComponentService.prototype.Getsubcategoryonchange = function (str) {
        return this.httpclient.get(this.actionUrl + "api/Data/Getsubcategoryonchange/" + str);
    };
    ComponentService.prototype.SaveMaterial = function (Material, getstatus) {
        Material.APPTYPE = getstatus;
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
    ComponentService.prototype.GetCategoryDropdown = function (id, status) {
        return this.httpclient.get(this.actionUrl + "api/Data/GetCategoryDropdown/" + id + "/" + status);
    };
    ComponentService.prototype.GetSubcategory = function (id, status) {
        //let body = {
        //    'str': str
        //}
        return this.httpclient.get(this.actionUrl + "api/Data/GetSubcategory/" + id + "/" + status);
    };
    ComponentService.prototype.SaveSubcategory = function (Subcategory, status) {
        Subcategory.CATEGORYTYPE = status;
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