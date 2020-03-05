import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { itreleaseorder } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'getpublishcontract',
  templateUrl:'getpublishcontract.html'
})

export class getpublishcontract {
  message: string;
  itreleaseorder: itreleaseorder[];
  itreleaseorders: itreleaseorder[];

  dataSource;
  displayedColumns: string[] = ['RELEASEORDERID', 'CONTRACTNO',  'View/Delete'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private Componentservices: ComponentService, private router: Router) { }

  ngOnInit() {

    localStorage.removeItem('viewPublishId');
    this.Componentservices
      .getreleaseorder().subscribe(
        data => {
          this.itreleaseorders = data, console.log(this.itreleaseorders),
            this.dataSource = new MatTableDataSource<itreleaseorder>(this.itreleaseorders),
            this.dataSource.paginator = this.paginator
        })

  }
  ViewPublish(itreleaseorder: itreleaseorder): void {
    localStorage.removeItem('viewPublishId');
    localStorage.setItem('viewPublishId', itreleaseorder.ID.toString());
    this.router.navigate(['IT/PublishContract'], { queryParams: { id: itreleaseorder.ID.toString() } });


  }
  deletePublish(itreleaseorder: itreleaseorder): void {
    if (confirm("Are you sure you want to delete this ?")) {
      this.Componentservices
        .deletereleaseorder(itreleaseorder.ID).subscribe(
          data => {
            this.message = data,

              this.itreleaseorders = this.itreleaseorders.filter(u => u !== itreleaseorder)
            this.dataSource = new MatTableDataSource<itreleaseorder>(this.itreleaseorders),
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
    this.itreleaseorders = pageOfItems;
  }



}
