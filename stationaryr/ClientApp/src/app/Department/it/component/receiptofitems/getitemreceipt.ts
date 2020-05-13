import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { itemreceipt } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'getitemreceipt',
  templateUrl: 'getitemreceipt.html'
})

export class getitemreceipt {
  message: string;
  itemreceipt: itemreceipt;
  itemreceipts: itemreceipt[];
  dataSource;
  displayedColumns: string[] = ['RELEASEORDERID', 'CHALLANNO', 'CHALLANDATE','RECEIPTDATE', 'View/Delete'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private Componentservices: ComponentService, private router: Router) { }

  ngOnInit() {

    localStorage.removeItem('viewitemreceiptId');
    this.Componentservices
      .GetItItemReceipt().subscribe(
        data => {
          this.itemreceipts = data, console.log(this.itemreceipts),
            this.dataSource = new MatTableDataSource<itemreceipt>(this.itemreceipts),
            this.dataSource.paginator = this.paginator
        })

  }

  edititemreceipt(itemreceipt: itemreceipt): void {
    localStorage.removeItem('viewitemreceiptId');
    localStorage.setItem('viewitemreceiptId', itemreceipt.ID.toString());
    this.router.navigate(['IT/ItemReceipt'], { queryParams: { id: itemreceipt.ID.toString() } });


  }
  deleteitemreceipt(itemreceipt: itemreceipt): void {
    if (confirm("Are you sure you want to delete this ?")) {
      this.Componentservices
        .DeleteItItemReceipt(itemreceipt.ID).subscribe(
          data => {
            this.message = data,

              this.itemreceipts = this.itemreceipts.filter(u => u !== itemreceipt)
            this.dataSource = new MatTableDataSource<itemreceipt>(this.itemreceipts),
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
    this.itemreceipts = pageOfItems;
  }
}
