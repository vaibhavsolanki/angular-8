import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ComponentService } from '../../../../services/ComponentService';
import { Router, ActivatedRoute } from '@angular/router';
import { PrintRepository, DGHUserRepository, Department, Report, User, SubCategory, Material, COMPANY, listofdropdown, Units } from '../../../../TableEntity/TableEntityClass';
import * as XLSX  from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
    selector: 'getReport',
    templateUrl: './GetReports.html'
})

export class GetReport {
    submitted = false;
    stockrow = false;
    loading = false;
    subcategory = false;
    subchildcategory = false;
    btnvisibility = true;
    Report: FormGroup;
    listofdropdown: listofdropdown[];
    Company: COMPANY[];
    Unit: Units[];
    User: User[];
    Department: Department[];
    Category: Material[];
    SubCategory: SubCategory[];
    SubChildCategory: SubCategory[];
    reports: Report[];
    DghuserRepositorys: DGHUserRepository[];
    Stock: number;
    Consumestock: number;
    available: number;
    @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
    dataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  EMP_Status: EmployeeStatus[] = [{ EMP_Status_ID: 'Working' }, { EMP_Status_ID: 'Separated' }, { EMP_Status_ID:'BOTH' }]
  displayedColumns: string[] = ['CATEGORY', 'SUBCATEGORY', 'SUBCHILDCATEGORY', 'EMPLOYEE', 'QUANTITY', 'DEPT_ID','DATEOFISSUE'];

    //ExportToExcel() {
    //    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    //    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //    /* save to file */
    //    XLSX.writeFile(wb, 'SheetJS.xlsx');

    //}
/* table id is passed over here */
    fileName = 'ExcelSheet.xlsx';  

    ExportToExcel() {
        let element = document.getElementById('excel-table');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);
    }
    constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

    }
    ngOnInit() {
        this.GetCategoryDropdown();
        this.Employeeload('BOTH');
      
        this.Report = this.formbuilder.group({
           
            CATEGORY: [],
            EMPLOYEE: [],
            SUBCATEGORY: [],
            DEPTID: [],
            SUBCHILDCATEGORY: [],
            FROM_DATE: [],
            TO_DATE: [],
          EMPLOYEE_STATUS:[]
                
        });
    }

    get f() { return this.Report.controls; }

    categorychangeload(value) {
        this.Componentservices.Getsubcategoryonchange(value).subscribe(data => {
            this.SubCategory = data; console.log(this.SubCategory);
           
            if (this.SubCategory.length > 0) {
                this.subcategory = true;
            }
            else {
                this.subcategory = false;
                this.Report.controls['SUBCATEGORY'].setValue(null);
                this.Report.controls['SUBCHILDCATEGORY'].setValue(null);
                this.Report.controls['EMPLOYEE'].setValue(null);
                this.Report.controls['DEPTID'].setValue(null);
                this.Report.controls['TO_DATE'].setValue(null);
                this.Report.controls['FROM_DATE'].setValue(null);
            }
        })

    }
    categorychange(value: string) {
        this.categorychangeload(value);


    }
  employee_status(value: string) {
    this.Report.controls['EMPLOYEE'].setValue(null);
    this.Employeeload(value);
  }

    subcategorychange(value: string) {
        this.Componentservices.Getsubcategoryonchange(value).subscribe(data => {
            this.SubChildCategory = data; console.log(this.SubChildCategory);

            if (this.SubChildCategory.length > 0) {
                this.subchildcategory = true;
            }
            else {
                this.subchildcategory = false;
               
                this.Report.controls['SUBCHILDCATEGORY'].setValue(null);
               
                //  this.Report.controls['TO_DATE'].setValue(null);
                //this.Report.controls['FROM_DATE'].setValue(null);
            }
        })

    }
  
  Employeeload(status) {
    this.Componentservices.dghemployee(status).subscribe(data => {
            //this.User = data;
            this.Department = this.User[0].DEPARTMENTS;
            console.log(this.User);
            console.log(this.Department);
        });

    }
   
GetCategoryDropdown() {
    this.Componentservices.GetMaterialforstaOrprint("BOTH").subscribe(data => {
        this.listofdropdown = data; console.log(this.Category);
        this.Company = this.listofdropdown[0].Company;
        this.Category = this.listofdropdown[0].Material;
        this.Unit = this.listofdropdown[0].Unit;
        console.log(this.Company);
    })
    }
    
    onSubmit() {
      
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
            .subscribe(data => {
                this.reports = data,
                    this.Stock = this.reports[0].IN_STOCK;
                this.Consumestock = this.reports[0].CONSUME;
                this.available = this.Stock - this.Consumestock;
                this.DghuserRepositorys = this.reports[0].Dghuser, this.loading = false; console.log(this.reports);

                this.dataSource = new MatTableDataSource<DGHUserRepository>(this.DghuserRepositorys),
                    this.dataSource.paginator = this.paginator
            },
                error => () => {

                },
                () => console.log(this.reports)
            );




    }

  
}


export interface EmployeeStatus {
  
  EMP_Status_ID: string;
}
