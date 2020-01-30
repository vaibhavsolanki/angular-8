import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { Role } from '../../../../modal/role.modal';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Permission } from '../../../../modal/permission.modal';
@Component({
  selector: 'app-role-master',
  templateUrl: './Rolemaster.html',
})
export class Rolemaster implements OnInit {
     @Input() link1: string;
  routelink: string;
  editroutelink: string;
  public Role: Role = new Role();
  Roles: Role[];
 datasubmit: string;
  btnvisibility: boolean = true;
  RoleForm: FormGroup;
  submitted = false;
  loading = false;
  allPermissions: Permission[] = [];
  pp: string[]=[];
  public selectedValues: { [key: string]: boolean; } = {};
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
      this.getUserPreferences();
 this.RoleForm = this.formbuilder.group({
          
            Name: ['', Validators.required],
      
   Description: [],
   Permissions: this.formbuilder.array([])
  
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
  onCheckboxChange(e) {
    const Permissions: FormArray = this.RoleForm.get('Permissions') as FormArray;

    if (e.target.checked) {
      Permissions.push(new FormControl(e.target.value));
      this.pp.push(e.target.value);
     
    } else {
      let i: number = 0;
      Permissions.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          Permissions.removeAt(i);
          this.pp.indexOf(e.target.value);
          return;
        }
        i++;
      });
    }
  }
  getUserPreferences() {
    return this.Componentservices.getpermission().subscribe(data => {
      this.allPermissions = data;
      console.log(this.allPermissions);
      
      
    });
  }
  selectAll() {
    this.allPermissions.forEach(p => this.selectedValues[p.Value] = true);
  }


  selectNone() {
    this.allPermissions.forEach(p => this.selectedValues[p.Value] = false);
  }
  toggleGroup(groupName: string) {
    let firstMemberValue: boolean;

    this.allPermissions.forEach(p => {
      if (p.GroupName != groupName) {
        return;
      }

      if (firstMemberValue == null) {
        firstMemberValue = this.selectedValues[p.Value] == true;
      }

      this.selectedValues[p.Value] = !firstMemberValue;
    });
  }

get f() { return this.RoleForm.controls; }
 onSubmit() {
        this.submitted = true;

      if (this.RoleForm.invalid) {
            return;
        }
   this.loading = true;

   
   this.Role.Permissions = this.allPermissions;
   
  //this.Role.permissions = this.getSelectedPermissions();
      this.Componentservices
        .Saverole(this.RoleForm.value, this.Role.Permissions)
        .subscribe(data => { this.datasubmit = data, alert(this.datasubmit), this.loading = false; console.log(this.datasubmit); this.router.navigate([this.editroutelink]); },
                error => () => {

                },
          () => console.log(this.datasubmit)
            );

  }

  private getSelectedPermissions(value: string ) {

    return this.allPermissions.filter(p => this.selectedValues[value] == true);
    //.filter(p => this.selectedValues[p.value] == true)
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
