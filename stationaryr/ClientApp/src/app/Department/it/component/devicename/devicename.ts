import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { devicename } from '../../../../TableEntity/TableEntityClass';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devicename',
  templateUrl: './devicename.html',
})
export class ItDevicename implements OnInit {
  DeviceForm: FormGroup;
  submitted = false;
  loading = false;
  datasubmit: string;
  Devicename: devicename;
  Devicenames: devicename[];
  btnvisibility: boolean = true;
  constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

  }
  ngOnInit() {
    this.DeviceForm = this.formbuilder.group({

      DEVICENAME: ['', Validators.required],

   
    })
    let empid = localStorage.getItem('editdevicenameId');

    if (+empid > 0) {
      this.Componentservices.getDevicenameId(+empid).subscribe(data => {
        this.Devicenames = data,
          console.log(this.Devicenames),
          this.DeviceForm.controls['DEVICENAME'].setValue(this.Devicenames[0].DEVICENAME);
      
        //this.MaterialForm.controls['ID'].setValue(this.materials[0].ID);
      })

      this.btnvisibility = false;
    }


  }

  get f() { return this.DeviceForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.DeviceForm.invalid) {
      return;
    }
    this.loading = true;
    this.Componentservices
      .SaveDevicename(this.DeviceForm.value)
      .subscribe(data => { this.datasubmit = data, alert(this.datasubmit), this.loading = false; console.log(this.datasubmit); this.router.navigate(['IT/GetDevice']); },
        error => () => {

        },
        () => console.log(this.datasubmit)
      );

  }
  onUpdate() {
    this.submitted = true;

    if (this.DeviceForm.invalid) {
      return;
    }
    this.loading = true;
    this.Componentservices
      .UpdateDevicename(this.DeviceForm.value)
      .subscribe(data => { this.datasubmit = data, alert(this.datasubmit), this.loading = false; console.log(this.datasubmit); this.router.navigate(['IT/GetDevice']); },
        error => () => {

        },
        () => console.log(this.datasubmit)
      );
  }
}


