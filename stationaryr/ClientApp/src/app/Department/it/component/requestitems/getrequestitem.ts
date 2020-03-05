import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { itissueitems } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'getrequestitem',
  templateUrl: 'getrequestitem.html'
})

export class getrequestitem {
  message: string;
  itissueitem: itissueitems[];
  itissueitems: itissueitems[];

  dataSource;
  displayedColumns: string[] = ['ISSUEID', 'Edit/Delete'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private Componentservices: ComponentService, private router: Router) { }

  ngOnInit() {

    localStorage.removeItem('editissueitemId');
    this.Componentservices
      .GetItIssueItems().subscribe(
        data => {
          this.itissueitems = data, console.log(this.itissueitems),
            this.dataSource = new MatTableDataSource<itissueitems>(this.itissueitems),
            this.dataSource.paginator = this.paginator
        })

  }
  editIssueItem(itissueitems: itissueitems): void {
    localStorage.removeItem('editissueitemId');
    localStorage.setItem('editissueitemId', itissueitems.ISSUEID.toString());
    this.router.navigate(['IT/RequestItems'], { queryParams: { id: itissueitems.ISSUEID.toString() } });


  }
  deleteIssueItem(itissueitems: itissueitems): void {
    if (confirm("Are you sure you want to delete this ?")) {
      this.Componentservices
        .DeleteItIssueItems(itissueitems.ISSUEID).subscribe(
          data => {
            this.message = data,

              this.itissueitems = this.itissueitems.filter(u => u !== itissueitems)
            this.dataSource = new MatTableDataSource<itissueitems>(this.itissueitems),
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
    this.itissueitems = pageOfItems;
  }

}
