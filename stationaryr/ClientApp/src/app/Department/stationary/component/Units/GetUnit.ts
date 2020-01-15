import { Component, OnInit ,ViewChild} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { Units } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
    selector: 'getUnits',
    templateUrl: './GetUnits.html'
})

export class GetUnits {

    message: string;
    Unit: Units[];
    Units: Units[];
    dataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    displayedColumns: string[] = ['UNITS_DESCRIPTION', 'Edit/Delete'];
    constructor(private Componentservices: ComponentService, private router: Router) { }

    ngOnInit() {
        localStorage.removeItem('editunitsId');
        this.Componentservices
            .GetUnits().subscribe(
                data => {
                this.Unit = data, console.log(this.Unit),
                    this.dataSource = new MatTableDataSource<Units>(this.Unit),
                        this.dataSource.paginator = this.paginator
                })

    }
    editUnits(units: Units): void {
        localStorage.removeItem('editunitsId');
        localStorage.setItem('editunitsId', units.ID.toString());
        this.router.navigate(['AddUnits'], { queryParams: { id: units.ID.toString() } } );
      

    }
    deleteUnits(units: Units): void {
        if (confirm("Are you sure you want to delete this ?")) {
            this.Componentservices
                .deleteunits(units.ID).subscribe(
                    data => {
                        this.message = data,
                          
                            this.Unit = this.Unit.filter(u => u !== units)
                        this.dataSource = new MatTableDataSource<Units>(this.Unit),
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
        this.Unit = pageOfItems;
    }


}
