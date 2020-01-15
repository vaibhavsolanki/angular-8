import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { devicename } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-getdevicename',
  templateUrl: './getdevicename.html',
})
export class ItGetDevicename implements OnInit {
  message: string;
  Devicename: devicename;
  Devicenames: devicename[];
  // MaterialPage: Material[];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['DEVICENAME', 'Edit/Delete'];
  constructor(private Componentservices: ComponentService, private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('editdevicenameId');
    this.Componentservices
      .GetDevicename().subscribe(
        data => {
          this.Devicenames = data, console.log(this.Devicenames),
            this.dataSource = new MatTableDataSource<devicename>(this.Devicenames),
            this.dataSource.paginator = this.paginator
        })

  }

  editdevicename(devicename: devicename): void {

    localStorage.removeItem('editdevicenameId');
    localStorage.setItem('editdevicenameId', devicename.ID.toString());
    this.router.navigate(['IT/AddDevice'], { queryParams: { id: devicename.ID.toString() } });


  }
  deletedevicename(devicename: devicename): void {
    if (confirm("Are you sure you want to delete this ?")) {
      this.Componentservices
        .deleteDevicename(devicename.ID).subscribe(
          data => {
            this.message = data;

           // alert(this.message);


            this.Devicenames = this.Devicenames.filter(u => u !== devicename)
            this.dataSource = new MatTableDataSource<devicename>(this.Devicenames),
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
    this.Devicenames = pageOfItems;
  }

}






