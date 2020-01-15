"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var XLSX = require("xlsx");
var material_1 = require("@angular/material");
var GetReport = /** @class */ (function () {
    function GetReport(formbuilder, Componentservices, router) {
        this.formbuilder = formbuilder;
        this.Componentservices = Componentservices;
        this.router = router;
        this.submitted = false;
        this.stockrow = false;
        this.loading = false;
        this.subcategory = false;
        this.subchildcategory = false;
        this.btnvisibility = true;
        this.displayedColumns = ['CATEGORY', 'SUBCATEGORY', 'SUBCHILDCATEGORY', 'EMPLOYEE', 'QUANTITY', 'DEPT_ID'];
        //ExportToExcel() {
        //    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
        //    const wb: XLSX.WorkBook = XLSX.utils.book_new();
        //    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        //    /* save to file */
        //    XLSX.writeFile(wb, 'SheetJS.xlsx');
        //}
        /* table id is passed over here */
        this.fileName = 'ExcelSheet.xlsx';
    }
    GetReport.prototype.ExportToExcel = function () {
        var element = document.getElementById('excel-table');
        var ws = XLSX.utils.table_to_sheet(element);
        /* generate workbook and add the worksheet */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        XLSX.writeFile(wb, this.fileName);
    };
    GetReport.prototype.ngOnInit = function () {
        this.GetCategoryDropdown();
        this.Employeeload();
        this.Report = this.formbuilder.group({
            CATEGORY: [],
            EMPLOYEE: [],
            SUBCATEGORY: [],
            DEPTID: [],
            SUBCHILDCATEGORY: [],
            FROM_DATE: [],
            TO_DATE: []
        });
    };
    Object.defineProperty(GetReport.prototype, "f", {
        get: function () { return this.Report.controls; },
        enumerable: true,
        configurable: true
    });
    GetReport.prototype.categorychangeload = function (value) {
        var _this = this;
        this.Componentservices.Getsubcategoryonchange(value).subscribe(function (data) {
            _this.SubCategory = data;
            console.log(_this.SubCategory);
            if (_this.SubCategory.length > 0) {
                _this.subcategory = true;
            }
            else {
                _this.subcategory = false;
                _this.Report.controls['SUBCATEGORY'].setValue(null);
                _this.Report.controls['SUBCHILDCATEGORY'].setValue(null);
                _this.Report.controls['EMPLOYEE'].setValue(null);
                _this.Report.controls['DEPTID'].setValue(null);
                _this.Report.controls['TO_DATE'].setValue(null);
                _this.Report.controls['FROM_DATE'].setValue(null);
            }
        });
    };
    GetReport.prototype.categorychange = function (value) {
        this.categorychangeload(value);
    };
    GetReport.prototype.subcategorychange = function (value) {
        var _this = this;
        this.Componentservices.Getsubcategoryonchange(value).subscribe(function (data) {
            _this.SubChildCategory = data;
            console.log(_this.SubChildCategory);
            if (_this.SubChildCategory.length > 0) {
                _this.subchildcategory = true;
            }
            else {
                _this.subchildcategory = false;
                _this.Report.controls['SUBCATEGORY'].setValue(null);
                _this.Report.controls['SUBCHILDCATEGORY'].setValue(null);
                _this.Report.controls['EMPLOYEE'].setValue(null);
                _this.Report.controls['DEPTID'].setValue(null);
                //  this.Report.controls['TO_DATE'].setValue(null);
                //this.Report.controls['FROM_DATE'].setValue(null);
            }
        });
    };
    GetReport.prototype.Employeeload = function () {
        var _this = this;
        this.Componentservices.dghemployee().subscribe(function (data) {
            _this.User = data;
            _this.Department = _this.User[0].DEPARTMENTS;
            console.log(_this.User);
            console.log(_this.Department);
        });
    };
    GetReport.prototype.GetCategoryDropdown = function () {
        var _this = this;
        this.Componentservices.GetMaterialforstaOrprint("BOTH").subscribe(function (data) {
            _this.listofdropdown = data;
            console.log(_this.Category);
            _this.Company = _this.listofdropdown[0].Company;
            _this.Category = _this.listofdropdown[0].Material;
            _this.Unit = _this.listofdropdown[0].Unit;
            console.log(_this.Company);
        });
    };
    GetReport.prototype.onSubmit = function () {
        var _this = this;
        if (this.Report.controls['TO_DATE'].value == "") {
            this.Report.controls['TO_DATE'].setValue(null);
        }
        if (this.Report.controls['FROM_DATE'].value == "") {
            this.Report.controls['FROM_DATE'].setValue(null);
        }
        this.submitted = true;
        this.loading = true;
        this.stockrow = true;
        this.Componentservices
            .dghreport(this.Report.value)
            .subscribe(function (data) {
            _this.reports = data,
                _this.Stock = _this.reports[0].IN_STOCK;
            _this.Consumestock = _this.reports[0].CONSUME;
            _this.available = _this.Stock - _this.Consumestock;
            _this.DghuserRepositorys = _this.reports[0].Dghuser, _this.loading = false;
            console.log(_this.reports);
            _this.dataSource = new material_1.MatTableDataSource(_this.DghuserRepositorys),
                _this.dataSource.paginator = _this.paginator;
        }, function (error) { return function () {
        }; }, function () { return console.log(_this.reports); });
    };
    __decorate([
        core_1.ViewChild('TABLE', { static: false })
    ], GetReport.prototype, "TABLE", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: true })
    ], GetReport.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: true })
    ], GetReport.prototype, "sort", void 0);
    GetReport = __decorate([
        core_1.Component({
            selector: 'getReport',
            templateUrl: './GetReports.html'
        })
    ], GetReport);
    return GetReport;
}());
exports.GetReport = GetReport;
//# sourceMappingURL=GetReport.js.map