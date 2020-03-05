import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ComponentService } from '../../../../services/ComponentService';
import { Router, ActivatedRoute } from '@angular/router';
import { itvendor } from '../../../../TableEntity/TableEntityClass';

@Component({
  selector: 'vendor',
  templateUrl: 'vendor.html'
})
export class itvendors implements OnInit {

  VendorForm: FormGroup;
  submitted = false;
  loading = false;
  datasubmit: string;
  itvendor: itvendor;
  itvendors: itvendor[];
  btnvisibility: boolean = true;

  constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {


  }
  ngOnInit() {
    this.VendorForm = this.formbuilder.group({

      VENDORNAME: ['', Validators.required],
      PHONENO: ['', Validators.required],
      ADDRESS: ['', Validators.required],



    })
    let empid = localStorage.getItem('editVendorId');

    if (empid != null) {
      this.Componentservices.GetItVendorById(+empid).subscribe(data => {
        this.itvendors = data
        this.VendorForm.controls['VENDORNAME'].setValue(this.itvendors[0].VENDORNAME);
        this.VendorForm.controls['PHONENO'].setValue(this.itvendors[0].PHONENO);
        this.VendorForm.controls['ADDRESS'].setValue(this.itvendors[0].ADDRESS);
      })
      this.btnvisibility = false;
    }
   
  }

  get f() { return this.VendorForm.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.VendorForm.invalid) {
      return;
    }
    this.loading = true;

    this.Componentservices
      .SaveItVendor(this.VendorForm.value)
      .subscribe(data => { this.datasubmit = data, this.loading = false; console.log(this.datasubmit); this.router.navigate(['IT/GetVendor']); },
        error => () => {

        },
        () => console.log(this.datasubmit)
      );


  }
  onUpdate() {
    this.submitted = true;

    if (this.VendorForm.invalid) {
      return;
    }
    this.loading = true;

    this.Componentservices
      .UpdateItVendor(this.VendorForm.value)
      .subscribe(data => { this.datasubmit = data, this.loading = false; console.log(this.datasubmit); this.router.navigate(['IT/GetVendor']); },
        error => () => {

        },
        () => console.log(this.datasubmit)
      );

  }

}
