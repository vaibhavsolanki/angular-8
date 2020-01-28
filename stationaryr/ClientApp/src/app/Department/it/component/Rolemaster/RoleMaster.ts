import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { Role } from '../../../../modal/role.modal';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-role-master',
  templateUrl: './Rolemaster.html',
})
export class Rolemaster implements OnInit {
     @Input() link1: string;
  routelink: string;
  editroutelink: string;
  Role: Role;
  Roles: Role[];
 datasubmit: string;
  btnvisibility: boolean = true;
  RoleForm: FormGroup;
  submitted = false;
  loading = false;
 constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

    }
 

    ngOnInit() {
if (this.link1 == undefined) {
      this.routelink = "GetRolemaster";
      this.editroutelink = "IT/GetRolemaster"

      
    }
    else {
      this.routelink = this.link1;
      this.editroutelink = "stationary/" + this.link1
     
    }
 this.RoleForm = this.formbuilder.group({
          
            Name: ['', Validators.required],
      
        Description: []

        })

let empid = localStorage.getItem('editRoleId');

      if (empid !=null) {
        this.Componentservices.getRoleId(empid).subscribe(data => {
          this.Role = data,
                console.log(this.Role),
            this.RoleForm.controls['Name'].setValue(this.Role.Name);
          this.RoleForm.controls['Description'].setValue(this.Role.Description);
        
              
            })

            this.btnvisibility = false;
        }
}



get f() { return this.RoleForm.controls; }
 onSubmit() {
        this.submitted = true;

      if (this.RoleForm.invalid) {
            return;
        }
        this.loading = true;
      this.Componentservices
        .Saverole(this.RoleForm.value)
        .subscribe(data => { this.datasubmit = data, alert(this.datasubmit), this.loading = false; console.log(this.datasubmit); this.router.navigate([this.editroutelink]); },
                error => () => {

                },
          () => console.log(this.datasubmit)
            );

    }
    onUpdate() {
       // this.submitted = true;

      //if (this.RoleForm.invalid) {
      //      return;
     //   }
      //  this.loading = true;
     // this.Componentservices
     //   .Updateusers(this.UsersForm.value)
      //    .subscribe(data => { this.users = data, alert(this.users), this.loading = false; console.log(this.users); this.router.navigate([this.editroutelink]); },
       //         error => () => {

       //         },
       //     () => console.log(this.users)
       //     );
    }
}
