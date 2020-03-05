import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { itvendor } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'getvendor',
  templateUrl: 'getvendor.html'
})
export class getitvendor implements OnInit {
  message: string;
  itvendor: itvendor[];
  itvendors: itvendor[];
  dataSource;
  displayedColumns: string[] = ['VENDORNAME', 'PHONENO', 'ADDRESS',  'Edit/Delete'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private Componentservices: ComponentService, private router: Router) { }
  ngOnInit() {
    localStorage.removeItem('editVendorId');
    this.Componentservices
      .GetItVendor().subscribe(
        data => {
          this.itvendors = data, console.log(this.itvendors),
            this.dataSource = new MatTableDataSource<itvendor>(this.itvendors),
            this.dataSource.paginator = this.paginator
        })
  }

  editVendor(itvendor: itvendor): void {
    localStorage.removeItem('editVendorId');
    localStorage.setItem('editVendorId', itvendor.ID.toString());
    this.router.navigate(['IT/Vendor'], { queryParams: { id: itvendor.ID.toString() } });


  }

  deleteVendor(itvendor: itvendor): void {
    if (confirm("Are you sure you want to delete this ?")) {
      this.Componentservices
        .DeleteItVendor(itvendor.ID).subscribe(
          data => {
            this.message = data,

              this.itvendors = this.itvendors.filter(u => u !== itvendor)
            this.dataSource = new MatTableDataSource<itvendor>(this.itvendors),
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
    this.itvendors = pageOfItems;
  }


}
