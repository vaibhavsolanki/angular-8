import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { UsersDgh, Department } from '../../../../TableEntity/TableEntityClass';
import { Role } from '../../../../modal/role.modal';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserEdit } from '../../../../modal/edit-user.modal'
@Component({
    selector: 'app-users',
    templateUrl: './Users.html',
})

export class UsersComponent {
  @Input() link1: string;
  routelink: string;
  editroutelink: string;
  UsersForm: FormGroup;
    submitted = false;
    loading = false;
    users: string;
  User: UserEdit;
  Users: UserEdit[];
  Roles: Role[]=[];
  //user: User[]
  Department: Department[];
    btnvisibility: boolean = true;
    constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

    }
 
  ngOnInit() {
 if (this.link1 == undefined) {
      this.routelink = "GetUsers";
      this.editroutelink = "stationary/GetUsers";
    

    }

    else {
     
      this.routelink = this.link1;
      this.editroutelink = "IT/" + this.link1
      
    }
    this.departmentload();
    this.getroles();
      this.UsersForm = this.formbuilder.group({
          
            UserName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        Department: [],
        Roles: [],
        NewPassword: ['', Validators.required]
        })
        let empid = localStorage.getItem('editusersId');

      if (+empid > 0) {
        this.Componentservices.getuserId(empid).subscribe(data => {
              this.Users = data,
                console.log(this.Users),
            this.UsersForm.controls['USERNAME'].setValue(this.Users[0].UserName);
          //this.UsersForm.controls['EMAILID'].setValue(this.Users[0].Email);
          //this.UsersForm.controls['PHONENO'].setValue(this.Users[0].PhoneNumber);
          //this.UsersForm.controls['DEPTID'].setValue(this.Users[0].Department); 
              
            })

            this.btnvisibility = false;
        }
  }


  getroles() {
    this.Componentservices
      .GetRoles().subscribe(
        data => {
          this.Roles = data, console.log(this.Roles)
          
        })
  }
  get f() { return this.UsersForm.controls; }
  departmentload() {
    this.Componentservices.dghemployee('BOTH').subscribe(data => {
     // this.user = data;
     // this.Department = this.user[0].DEPARTMENTS;
      console.log(this.User);
      console.log(this.Department);
    });
  }
    onSubmit() {
        this.submitted = true;

      if (this.UsersForm.invalid) {
            return;
        }
        this.loading = true;
      this.Componentservices
        .SaveUsers(this.UsersForm.value)

      
        .subscribe(data => { this.users = data, alert(this.users), this.loading = false; console.log(this.users); this.router.navigate([this.editroutelink]); },
                error => () => {

                },
          () => console.log(this.users)
            );

    }
    onUpdate() {
        this.submitted = true;

      if (this.UsersForm.invalid) {
            return;
        }
        this.loading = true;
      this.Componentservices
        .Updateusers(this.UsersForm.value)
          .subscribe(data => { this.users = data, alert(this.users), this.loading = false; console.log(this.users); this.router.navigate([this.editroutelink]); },
                error => () => {

                },
            () => console.log(this.users)
            );
    }
}



