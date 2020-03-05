import { Component, OnInit, ViewChild ,Input} from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { Role } from '../../../../modal/role.modal';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-get-role-master',
  templateUrl: './getrolemaster.html',
})
export class GetRolemaster implements OnInit {

@Input() link1: string;
  routelink: string;
  editroutelink: string;
  Role: Role[];
  Roles: Role[];
message:string;
    dataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['NAME','DESCRIPTION', 'Edit/Delete'];
    constructor(private Componentservices: ComponentService, private router: Router) { }


ngOnInit() {
if (this.link1 == undefined) {
      this.routelink = "Rolemaster";
      this.editroutelink = "IT/Rolemaster"

      
    }
    else {
      this.routelink = this.link1;
      this.editroutelink = "stationary/" + this.link1
     
    }
localStorage.removeItem('editRoleId');
      this.Componentservices
        .GetRoles().subscribe(
                data => {
            this.Roles = data, console.log(this.Roles),
              this.dataSource = new MatTableDataSource<Role>(this.Roles),
                        this.dataSource.paginator = this.paginator
                })

}

  editRole(role: Role): void {


    localStorage.removeItem('editRoleId');
    localStorage.setItem('editRoleId', role.Name);
    this.router.navigate([this.editroutelink], { queryParams: { name: role.Name } });
      

    }
  deleteRole(role: Role): void {
        if (confirm("Are you sure you want to delete this ?")) {
          this.Componentservices
            .deleterole(role.Id).subscribe(
                    data => {
                        this.message = data,
                          
                          this.Roles = this.Roles.filter(u => u !== role)
                this.dataSource = new MatTableDataSource<Role>(this.Roles),
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
      this.Roles = pageOfItems;
    }
}
