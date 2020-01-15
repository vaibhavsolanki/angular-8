import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { DGHUserRepository } from '../../../../TableEntity/TableEntityClass';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
    selector: 'getDghuserRepository',
    templateUrl: './GetdghuserRepository.html'
})

export class GetDghuserRepository  {

    message: string;
    DghuserRepository: DGHUserRepository[];
    DghuserRepositorys: DGHUserRepository[];
    dataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    displayedColumns: string[] = ['CATEGORY', 'SUBCATEGORY','SUBCHILDCATEGORY', 'EMPLOYEE', 'QUANTITY', 'DATE_OF_ISSUE', 'ISSUER','REMARK', 'Edit/Delete'];

    constructor(private Componentservices: ComponentService, private router: Router) { }

    ngOnInit() {
        localStorage.removeItem('editDghuserRepositoryId');
        this.Componentservices
            .GetDGHuser_Repository().subscribe(
                data => {
                this.DghuserRepositorys = data, console.log(this.DghuserRepositorys)
                    this.dataSource = new MatTableDataSource<DGHUserRepository>(this.DghuserRepositorys),
                        this.dataSource.paginator = this.paginator

                })

    }
    editDghuserRepository(DGHUserRepository: DGHUserRepository): void {
        localStorage.removeItem('editDghuserRepositoryId');
        localStorage.setItem('editDghuserRepositoryId', DGHUserRepository.ID.toString());
        this.router.navigate(['DghuserRepository'], { queryParams: { id: DGHUserRepository.ID.toString() } });
      

    }
    deleteDghuserRepository(DGHUserRepository: DGHUserRepository): void {
        if (confirm("Are you sure you want to delete this ?")) {
            this.Componentservices
                .deleteDghuser_Repository(DGHUserRepository.ID).subscribe(
                    data => {
                        this.message = data,
                          
                            this.DghuserRepositorys = this.DghuserRepositorys.filter(u => u !== DGHUserRepository)
                        this.dataSource = new MatTableDataSource<DGHUserRepository>(this.DghuserRepositorys),
                            this.dataSource.paginator = this.paginator
                    }
                )
        }
    }
    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.DghuserRepositorys = pageOfItems;
    }


}
