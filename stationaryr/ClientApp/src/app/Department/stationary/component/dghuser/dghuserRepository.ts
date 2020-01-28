import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { DGHUserRepository, User, SubCategory, Material, COMPANY, listofdropdown, Units } from '../../../../TableEntity/TableEntityClass';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-dghuserrepository',
    templateUrl: './dghuserRepository.html',
})

export class DGHuserRepositoryComponent {
    DghuserRepos: FormGroup;
    submitted = false;
    subcategory = false;
    subchildcategory = false;
    loading = false;
    Material: string;
    listofdropdown: listofdropdown[];
    Company: COMPANY[];
    User: User[];
    Unit: Units[];
    Stock:number = 0;
    Category: Material[];
    SubCategory: SubCategory[];
    SubChildCategory: SubCategory[];
    DGHUserRepository: DGHUserRepository;
    DGHUserRepositorys: DGHUserRepository[];
    btnvisibility: boolean = true;
    stockdiv = false;
    constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

    }
    
    ngOnInit() {
        this.GetCategoryDropdown();
        this.Employeeload();
        this.DghuserRepos = this.formbuilder.group({
           
            CATEGORY: ['', Validators.required],
            EMPLOYEE: ['', Validators.required],
           
            //DATE_OF_RECEIPT: ['', Validators.required],
           
            QUANTITY: ['', Validators.required],
            DATE_OF_ISSUE: ['', Validators.required],
            ISSUER: [],
            REMARK: [],
            SUBCATEGORY: [],
            SUBCHILDCATEGORY: [],
          
        })
        let empid = localStorage.getItem('editDghuserRepositoryId');

        if (+empid > 0) {
            this.Componentservices.getDGHuser_RepositoryId(+empid).subscribe(data => {
                this.DGHUserRepositorys = data,
                    console.log(this.DGHUserRepositorys)
              this.DghuserRepos.controls['CATEGORY'].setValue(this.DGHUserRepositorys[0].CATEGORY);
              if (this.DGHUserRepositorys[0].SUBCATEGORY != "") {
                this.subcategory = true;
                this.categorychange(this.DGHUserRepositorys[0].CATEGORY);
                this.DghuserRepos.controls['SUBCATEGORY'].setValue(this.DGHUserRepositorys[0].SUBCATEGORY);
              }
              if (this.DGHUserRepositorys[0].SUBCHILDCATEGORY != "") {
                this.subchildcategory = true;
                this.subcategorychange(this.DGHUserRepositorys[0].SUBCATEGORY);
                this.DghuserRepos.controls['SUBCHILDCATEGORY'].setValue(this.DGHUserRepositorys[0].SUBCHILDCATEGORY);
              }

             
                this.DghuserRepos.controls['EMPLOYEE'].setValue(this.DGHUserRepositorys[0].EMPLOYEE);

                //this.DghuserRepos.controls['DATE_OF_RECEIPT'].setValue(this.DGHUserRepositorys[0].DATE_OF_RECEIPT);
                this.DghuserRepos.controls['QUANTITY'].setValue(this.DGHUserRepositorys[0].QUANTITY);
              this.DghuserRepos.controls['DATE_OF_ISSUE'].setValue(this.DGHUserRepositorys[0].DATE_OF_ISSUE);
                this.DghuserRepos.controls['REMARK'].setValue(this.DGHUserRepositorys[0].REMARK);

                this.DghuserRepos.controls['ISSUER'].setValue(this.DGHUserRepositorys[0].ISSUER);
             
            })

            this.btnvisibility = false;
        }
    }
    Employeeload() {
        this.Componentservices.dghemployee('Working').subscribe(data => {
           // this.User = data;
            console.log(this.User);
        });

    }
    GetCategoryDropdown () {
        this.Componentservices.GetMaterialforstaOrprint("BOTH").subscribe(data => {
            this.listofdropdown = data; console.log(this.Category);
            this.Company = this.listofdropdown[0].Company;
            this.Category = this.listofdropdown[0].Material;
            this.Unit = this.listofdropdown[0].Unit;
            console.log(this.Company);
        })
  }

 

    getstock() {
      this.Stock = 0;
        this.Componentservices.GetStock(this.DghuserRepos.controls['CATEGORY'].value,
          this.DghuserRepos.controls['SUBCATEGORY'].value, this.DghuserRepos.controls['SUBCHILDCATEGORY'].value).subscribe(
            data => { this.Stock = data })
    }
    subcategorychange(value) {
       
        this.Componentservices.Getsubcategoryonchange(value).subscribe(data => {
            this.SubChildCategory = data; console.log(this.SubCategory);

            if (this.SubChildCategory.length > 0) {
                this.subchildcategory = true;
            }
            else {
                this.subchildcategory = false;
               // this.DghuserRepos.controls['SUBCATEGORY'].setValue(null);
               // this.DghuserRepos.controls['SUBCHILDCATEGORY'].setValue(null);

            }
        })
        this.getstock();

    }
    subchildcategorychange(value) {
        this.getstock();
    }
    get f() { return this.DghuserRepos.controls; }

   


    onSubmit() {


        this.submitted = true;

        if (this.DghuserRepos.invalid) {
            return;
        }
       
        if (+this.Stock < +this.DghuserRepos.controls['QUANTITY'].value) {
            alert("Quantity Should Be less then Stock")
            return;
        }
        this.loading = true;
        this.Componentservices
            .SaveDghuser_Repository(this.DghuserRepos.value)
            .subscribe(data => { this.Material = data, alert(this.Material), this.loading = false; console.log(this.Material); this.router.navigate(['GetDghuserRepository']); },
                error => () => {

                },
                () => console.log(this.Material)
            );

    }
    categorychangeload(value) {
        let cate: string = this.DghuserRepos.controls['CATEGORY'].value;
        if (cate == "") {
            this.stockdiv = false;}
        else {
            this.stockdiv = true;
        this.Componentservices.Getsubcategoryonchange(value).subscribe(data => {
            this.SubCategory = data; console.log(this.SubCategory);
            //  alert(this.SubCategory[0].STATUS);
          
            if (this.SubCategory.length > 0) {
                this.subcategory = true;
            }
            else {
                this.subcategory = false;
              //  this.DghuserRepos.controls['SUBCATEGORY'].setValue(null);
               // this.DghuserRepos.controls['SUBCHILDCATEGORY'].setValue(null);

            }
        })
            this.getstock()
        };

    }
    categorychange(value: string) {
        this.categorychangeload(value);


    }
    onUpdate() {
        this.submitted = true;

        if (this.DghuserRepos.invalid) {
            return;
        }
       
        if (this.Stock < this.DghuserRepos.controls['QUANTITY'].value) {
            alert("Quantity Should Be less then Stock")
            return;
        }
        this.loading = true;
        this.Componentservices
            .UpdateDghuser_Repository(this.DghuserRepos.value)
            .subscribe(data => { this.Material = data, alert(this.Material), this.loading = false; console.log(this.Material); this.router.navigate(['GetDghuserRepository']); },
                error => () => {

                },
                () => console.log(this.Material)
            );
    }
}



