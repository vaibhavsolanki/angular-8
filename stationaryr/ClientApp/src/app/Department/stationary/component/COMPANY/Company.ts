import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';

//../services/ComponentService
import { COMPANY } from '../../../../TableEntity/TableEntityClass';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-Company',
    templateUrl: './Company.html',
})

export class CompanyComponent {
    CompanyForm: FormGroup;
    submitted = false;
    loading = false;
    companys: string;
    Company: COMPANY;
    Companys: COMPANY[];
    btnvisibility: boolean = true;
    constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

    }
 
    ngOnInit() {
        this.CompanyForm = this.formbuilder.group({
          
            COMPANYNAME: ['', Validators.required],
            
           
        })
        let empid = localStorage.getItem('editcompanyId');

        if (+empid > 0) {
            this.Componentservices.getcompanyId(+empid).subscribe(data => {
                this.Companys = data,
                    console.log(this.Companys),
                    this.CompanyForm.controls['COMPANYNAME'].setValue(this.Companys[0].COMPANYNAME);
               
              
            })

            this.btnvisibility = false;
        }
    }
    get f() { return this.CompanyForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.CompanyForm.invalid) {
            return;
        }
        this.loading = true;
        this.Componentservices
            .SaveCompany(this.CompanyForm.value)
            .subscribe(data => { this.companys = data, alert(this.companys), this.loading = false; console.log(this.companys); this.router.navigate(['GetCompany']); },
                error => () => {

                },
                () => console.log(this.companys)
            );

    }
    onUpdate() {
        this.submitted = true;

        if (this.CompanyForm.invalid) {
            return;
        }
        this.loading = true;
        this.Componentservices
            .Updatecompany(this.CompanyForm.value)
            .subscribe(data => { this.companys = data, alert(this.companys), this.loading = false; console.log(this.companys); this.router.navigate(['GetCompany']); },
                error => () => {

                },
                () => console.log(this.companys)
            );
    }
}



