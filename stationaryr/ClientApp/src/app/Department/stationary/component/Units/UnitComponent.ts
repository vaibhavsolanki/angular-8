import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { Units } from '../../../../TableEntity/TableEntityClass';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-units',
    templateUrl: './Units.html',
})

export class UnitComponent {
    UnitsForm: FormGroup;
    submitted = false;
    loading = false;
    units: string;
    Unit: Units;
    Units: Units[];
    btnvisibility: boolean = true;
    constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

    }
 
    ngOnInit() {
        this.UnitsForm = this.formbuilder.group({
          
            UNITS_DESCRIPTION: ['', Validators.required],
            
           
        })
        let empid = localStorage.getItem('editunitsId');

        if (+empid > 0) {
            this.Componentservices.getunitsId(+empid).subscribe(data => {
                this.Units = data,
                    console.log(this.Unit),
                    this.UnitsForm.controls['UNITS_DESCRIPTION'].setValue(this.Units[0].UNITS_DESCRIPTION);
               
              
            })

            this.btnvisibility = false;
        }
    }
    get f() { return this.UnitsForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.UnitsForm.invalid) {
            return;
        }
        this.loading = true;
        this.Componentservices
            .SaveUnits(this.UnitsForm.value)
            .subscribe(data => { this.units = data, alert(this.units), this.loading = false; console.log(this.units); this.router.navigate(['GetUnits']); },
                error => () => {

                },
                () => console.log(this.units)
            );

    }
    onUpdate() {
        this.submitted = true;

        if (this.UnitsForm.invalid) {
            return;
        }
        this.loading = true;
        this.Componentservices
            .Updateunits(this.UnitsForm.value)
            .subscribe(data => { this.units = data, alert(this.units), this.loading = false; console.log(this.units); this.router.navigate(['GetUnits']); },
                error => () => {

                },
                () => console.log(this.units)
            );
    }
}



