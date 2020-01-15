import { Component, OnInit,ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { PrintRepository } from '../../../../TableEntity/TableEntityClass';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
    selector: 'getPrintRepository',
    templateUrl: './GetPrintRepository.html'
})

export class GetPrintRepository  {

    message: string;
    PrintRepository: PrintRepository[];
    PrintRepositorys: PrintRepository[];
    dataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    displayedColumns: string[] = ['CATEGORY', 'COMPANY', 'ANNUAL_REQUIREMENT', 'UNIT', 'RATE', 'GST_RATE', 'GST_AMOUNT', 'TOTAL_ITEM_ORDER', 'TOTAL_ITEM_RECEIVED','Edit/Delete'];
    constructor(private Componentservices: ComponentService, private router: Router) { }

    ngOnInit() {
        localStorage.removeItem('editPrintRepositoryId');
        this.Componentservices
            .GetPrint_Repository().subscribe(
                data => {
                this.PrintRepositorys = data, console.log(this.PrintRepositorys),
                    this.dataSource = new MatTableDataSource<PrintRepository>(this.PrintRepositorys),
                        this.dataSource.paginator = this.paginator
    })
               

    }
    editStationaryRepository(PrintRepository: PrintRepository): void {
        localStorage.removeItem('editPrintRepositoryId');
        localStorage.setItem('editPrintRepositoryId', PrintRepository.ID.toString());
      this.router.navigate(['stationary/AddPrintRepository'] , { queryParams: { id: PrintRepository.ID.toString() } });
      

    }
    deleteStationaryRepository(PrintRepository: PrintRepository): void {
        if (confirm("Are you sure you want to delete this ?")) {
            this.Componentservices
                .deletePrint_Repository(PrintRepository.ID).subscribe(
                    data => {
                        this.message = data,
                          
                            this.PrintRepositorys = this.PrintRepositorys.filter(u => u !== PrintRepository),
                            this.dataSource = new MatTableDataSource<PrintRepository>(this.PrintRepositorys),
                            this.dataSource.paginator = this.paginator
                    }
                )
        }
    }
    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.PrintRepositorys = pageOfItems;
    }


}
