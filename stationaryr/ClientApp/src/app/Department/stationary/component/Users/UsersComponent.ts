import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { UsersDgh, Department, User } from '../../../../TableEntity/TableEntityClass';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  User: UsersDgh;
  Users: UsersDgh[];
  user: User[]
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
      this.UsersForm = this.formbuilder.group({
          
            USERNAME: ['', Validators.required],
        EMAILID: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        PHONENO: ['', [Validators.required, Validators.minLength(10)]],
        DEPTID: [],
        PASSWORD: ['', Validators.required]
        })
        let empid = localStorage.getItem('editusersId');

      if (+empid > 0) {
        this.Componentservices.getuserId(+empid).subscribe(data => {
              this.Users = data,
                console.log(this.Users),
            this.UsersForm.controls['USERNAME'].setValue(this.Users[0].USERNAME);
          this.UsersForm.controls['EMAILID'].setValue(this.Users[0].EMAILID);
          this.UsersForm.controls['PHONENO'].setValue(this.Users[0].PHONENO);
          this.UsersForm.controls['DEPTID'].setValue(this.Users[0].DEPTID); 
              
            })

            this.btnvisibility = false;
        }
    }
  get f() { return this.UsersForm.controls; }
  departmentload() {
    this.Componentservices.dghemployee('BOTH').subscribe(data => {
      this.user = data;
      this.Department = this.user[0].DEPARTMENTS;
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



