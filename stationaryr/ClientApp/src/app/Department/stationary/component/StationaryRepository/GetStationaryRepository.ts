import { Component, OnInit,ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { StationaryRepository } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
    selector: 'getStationaryRepository',
    templateUrl: './GetStationaryRepository.html'
})

export class GetStationaryRepository  {

    message: string;
    StationaryRepository: StationaryRepository[];
    StationaryRepositorys: StationaryRepository[];
	  dataSource;
    displayedColumns: string[] = ['CATEGORY', 'SUBCATEGORY','SUBCHILDCATEGORY', 'COMPANY', 'ESTIMATED_QUANTITY', 'UNIT', 'BASIC_AMOUNT', 'GST', 'TOTAL_ITEM_ORDER', 'TOTAL_ITEM_RECEIVED', 'DATEOFRECEIVED',  'Edit/Delete'];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(private Componentservices: ComponentService, private router: Router) { }

    ngOnInit() {
        localStorage.removeItem('editStationaryRepositoryId');
        this.Componentservices
            .GetStationary_Repository().subscribe(
                data => { this.StationaryRepositorys = data, console.log(this.StationaryRepositorys),
 this.dataSource = new MatTableDataSource<StationaryRepository>(this.StationaryRepositorys),
                        this.dataSource.paginator = this.paginator				})

    }
    editStationaryRepository(StationaryRepository: StationaryRepository): void {
        localStorage.removeItem('editStationaryRepositoryId');
        localStorage.setItem('editStationaryRepositoryId', StationaryRepository.ID.toString());
      this.router.navigate(['stationary/AddStationaryRepository'], { queryParams: { id: StationaryRepository.ID.toString() } });
       

    }
    deleteStationaryRepository(StationaryRepository: StationaryRepository): void {
        if (confirm("Are you sure you want to delete this ?")) {
            this.Componentservices
                .deleteStationary_Repository(StationaryRepository.ID).subscribe(
                    data => {
                        this.message = data,
                          
                            this.StationaryRepositorys = this.StationaryRepositorys.filter(u => u !== StationaryRepository)
                        this.dataSource = new MatTableDataSource<StationaryRepository>(this.StationaryRepositorys),
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
        this.StationaryRepositorys = pageOfItems;
    }



}
