import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { SubCategory } from '../../../../TableEntity/TableEntityClass';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-Subcategory',
    templateUrl: './SubCategory.html',
})

export class SubCategoryComponent {
  @Input() link1: string;
  routelink: string;
  editroutelink: string;
  getstatus: string;
    SubCategoryForm: FormGroup;
    submitted = false;
    loading = false;
    Category: SubCategory[];
    subcategory: string;
    SubCategory: SubCategory;
    SubCategorys: SubCategory[];
    btnvisibility: boolean = true;
    constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

    }
 
  ngOnInit() {
    if (this.link1 == undefined) {
      this.routelink = "GetSubCategory";
      this.editroutelink = "stationary/GetSubCategory";
      this.getstatus = "1";

    }

    else {
     
      this.routelink = this.link1;
      this.editroutelink = "IT/" + this.link1
      this.getstatus = "2";
    }
        this.SubCategoryForm = this.formbuilder.group({
          
            DESCRIPTION: ['', Validators.required],
            PARENT_ID: ['', Validators.required]
           
        })
        let empid = localStorage.getItem('editsubcategoryId');

        if (+empid > 0) {
            this.Componentservices.getSubcategoryId(+empid).subscribe(data => {
                this.SubCategorys = data,
                   
                    this.SubCategoryForm.controls['PARENT_ID'].setValue(this.SubCategorys[0].PARENT_ID);
                this.SubCategoryForm.controls['DESCRIPTION'].setValue(this.SubCategorys[0].DESCRIPTION);

              
            })

            this.btnvisibility = false;
        }

        this.GetCategoryDropdown();
    } 
  GetCategoryDropdown() {
    this.Componentservices.GetCategoryDropdown("SubCategory", this.getstatus).subscribe(data => {
            this.Category = data; console.log(this.Category);
        })
    }

    get f() { return this.SubCategoryForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.SubCategoryForm.invalid) {
            return;
        }
        this.loading = true;
      this.Componentservices
        .SaveSubcategory(this.SubCategoryForm.value, this.getstatus)
        .subscribe(data => { this.subcategory = data, alert(this.subcategory), this.loading = false; console.log(this.subcategory); this.router.navigate([this.editroutelink]); },
                error => () => {

                },
                () => console.log(this.subcategory)
            );

    }
    onUpdate() {
        this.submitted = true;

        if (this.SubCategoryForm.invalid) {
            return;
        }
        this.loading = true;
        this.Componentservices
            .UpdateSubcategory(this.SubCategoryForm.value)
          .subscribe(data => { this.subcategory = data, alert(this.subcategory), this.loading = false; console.log(this.subcategory); this.router.navigate([this.editroutelink]); },
                error => () => {

                },
                () => console.log(this.subcategory)
            );
    }
}



