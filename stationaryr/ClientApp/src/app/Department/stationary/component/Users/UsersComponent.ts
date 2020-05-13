import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserEdit } from '../../../../modal/edit-user.modal';
import { Role } from '../../../../modal/role.modal';
import { ComponentService } from '../../../../services/ComponentService';
import { Department } from '../../../../TableEntity/TableEntityClass';
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
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
  Roles: Role[] = [];
  
  array1: string[] = [];
// user: User[]
  passwordhide = true;
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
      Department: ['', Validators.required],
      Roles: [],
      NewPassword: ['', Validators.required],
      //ComparePassword: ['', Validators.required],
    },
     /* { validators: MustMatch('NewPassword', 'ComparePassword')}*/
    )
    let empid = localStorage.getItem('editusersId');

    if (empid != null) {
      this.UsersForm.get('NewPassword').setValidators(null);
      
      this.UsersForm.get('NewPassword').updateValueAndValidity();




      //this.UsersForm.get('ComparePassword').setErrors({ 'mustMatch': false });
      //this.UsersForm.get('ComparePassword').clearValidators();

      //this.UsersForm.get('ComparePassword').setValidators(null)
      //this.UsersForm.get('ComparePassword').updateValueAndValidity();
   this.passwordhide = false;
      this.Componentservices.getuserId(empid).subscribe(data => {
        this.User = data,

          this.User.Roles.map((a, b) => {
            this.array1.push(this.Roles.find(x => x.Name == a).Name)

          });
        console.log(this.array1);

        console.log(this.User)
        this.UsersForm.controls['UserName'].setValue(this.User.UserName);
        this.UsersForm.controls['Email'].setValue(this.User.Email);
        this.UsersForm.controls['PhoneNumber'].setValue(this.User.PhoneNumber);
        this.UsersForm.controls['Department'].setValue(this.User.Department);
        this.UsersForm.controls['Roles'].setValue(this.array1);
        this.UsersForm.controls['NewPassword'].setValue(this.User.NewPassword);

      })

      this.btnvisibility = false;
    }
    else {

      this.passwordhide = true;
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
  dghemployee() {
    this.Componentservices.dghemployee('BOTH').subscribe(data => {
      this.Users = data;
    //  this.Department = this.Users[0].Department;
      console.log(this.User);
    //  console.log(this.Department);
    });
  }
  
  departmentload() {
    this.Componentservices.department().subscribe(data => {
     // this.Users = data;
      this.Department = data;

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
      .subscribe(data => {
        this.users = data,
          alert(this.users),
          this.loading = false;
        console.log(this.users);
        this.router.navigate([this.editroutelink]);
      },
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
    this.User = this.UsersForm.value;
    this.User.Id = localStorage.getItem('editusersId');
    this.loading = true;
    this.Componentservices
      .Updateusers(this.User)
      .subscribe(data => {
        this.users = data, alert(this.users), this.loading = false; console.log(this.users);
        this.router.navigate([this.editroutelink]);
      },
        error => () => {

        },
      //  () => console.log(this.users)
      );
  }
}



