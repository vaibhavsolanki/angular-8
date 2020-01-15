import { Component, OnInit ,ViewChild} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { Units, UsersDgh, Department, User } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
    selector: 'getUsers',
    templateUrl: './GetUsers.html'
})

export class GetUsers {

  message: string;
  User: UsersDgh[];
  Users: UsersDgh[];
  user: User[]
  Department: Department[];
    dataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    displayedColumns: string[] = ['USERNAME','EMAILID','PHONENO','DEPTID', 'Edit/Delete'];
    constructor(private Componentservices: ComponentService, private router: Router) { }

    ngOnInit() {
        localStorage.removeItem('editusersId');
      this.Componentservices
        .GetUsers().subscribe(
                data => {
            this.Users = data, console.log(this.User),
              this.dataSource = new MatTableDataSource<UsersDgh>(this.Users),
                        this.dataSource.paginator = this.paginator
                })

  }

 
  editUsers(users: UsersDgh): void {
      localStorage.removeItem('editusersId');
    localStorage.setItem('editusersId', users.ID.toString());
    this.router.navigate(['AddUsers'], { queryParams: { id: users.ID.toString() } } );
      

    }
  deleteUsers(users: UsersDgh): void {
        if (confirm("Are you sure you want to delete this ?")) {
          this.Componentservices
            .deleteusers(users.ID).subscribe(
                    data => {
                        this.message = data,
                          
                          this.Users = this.Users.filter(u => u !== users)
                  this.dataSource = new MatTableDataSource<UsersDgh>(this.Users),
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
