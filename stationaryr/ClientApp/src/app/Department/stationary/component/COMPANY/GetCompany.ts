import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { COMPANY } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
    selector: 'getCompany',
    templateUrl: './GetCompany.html'
})

export class GetCompany {

    message: string;
    Company: COMPANY;
    Companys: COMPANY[];
    CompanysData: COMPANY[];
    dataSource;
    constructor(private Componentservices: ComponentService, private router: Router) { }
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    displayedColumns: string[] = ['COMPANYNAME','Edit/Delete'];
    ngOnInit() {
        localStorage.removeItem('editcompanyId');
        this.Componentservices
            .GetCompany().subscribe(
                data => {
                    this.Companys = data, console.log(this.Companys),
                        this.dataSource = new MatTableDataSource<COMPANY>(this.Companys),
                    this.dataSource.paginator = this.paginator
                    })

    }
    editCompany(company: COMPANY): void {
        localStorage.removeItem('editcompanyId');
        localStorage.setItem('editcompanyId', company.ID.toString());
        this.router.navigate(['AddCompany'], { queryParams: { id: company.ID.toString() } } );
      

    }
    deleteCompany(company: COMPANY): void {
        if (confirm("Are you sure you want to delete this ?")) {
            this.Componentservices
                .deletecompany(company.ID).subscribe(
                    data => {
                        this.message = data,

                            this.Companys = this.Companys.filter(u => u !== company)
                        this.dataSource = new MatTableDataSource<COMPANY>(this.Companys),
                            this.dataSource.paginator = this.paginator
                    }
                )
        }
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.CompanysData = pageOfItems;
    }


}
