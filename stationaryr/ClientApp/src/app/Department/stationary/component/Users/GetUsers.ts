import { Component, OnInit ,ViewChild,Input,Inject} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { Units, UsersDgh, Department } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEdit } from '../../../../modal/edit-user.modal'
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
    selector: 'getUsers',
    templateUrl: './GetUsers.html'
})

export class GetUsers  {


 @Input() link1: string;
  routelink: string;
  editroutelink: string;
  message: string;
  User: UserEdit[];
  Users: UserEdit[];
  //user: User[]
  Department: Department[];
  animal: string;
  name: string;

    dataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['USERNAME', 'EMAILID', 'PHONENO', 'DEPTID','ROLES', 'Edit/Delete'];
    constructor(private Componentservices: ComponentService, private router: Router) { }

    ngOnInit() {
if (this.link1 == undefined) {
      this.routelink = "AddUsers";
      this.editroutelink = "stationary/AddUsers"

      
    }
    else {
      this.routelink = this.link1;
      this.editroutelink = "IT/" + this.link1
     
    }
        localStorage.removeItem('editusersId');
      this.Componentservices
        .GetUsers().subscribe(
                data => {
            this.Users = data, console.log(this.User),
              this.dataSource = new MatTableDataSource<UserEdit>(this.Users),
                        this.dataSource.paginator = this.paginator
                })

  }


  editUsers(users: UserEdit): void {
    localStorage.removeItem('editusersId');
    localStorage.setItem('editusersId', users.Id.toString());
    this.router.navigate([this.editroutelink], { queryParams: { id: users.Id.toString() } });
      

    }
  deleteUsers(users: UserEdit): void {
        if (confirm("Are you sure you want to delete this ?")) {
          this.Componentservices
            .deleteusers(users.Id).subscribe(
                    data => {
                        this.message = data,
                          
                          this.Users = this.Users.filter(u => u !== users)
                this.dataSource = new MatTableDataSource<UserEdit>(this.Users),
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
      this.Users = pageOfItems;
    }
 
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
