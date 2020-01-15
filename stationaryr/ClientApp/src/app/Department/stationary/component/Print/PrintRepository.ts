import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { PrintRepository, SubCategory, orderreceived, Material, COMPANY, listofdropdown, Units } from '../../../../TableEntity/TableEntityClass';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
    selector: 'app-printrepository',
    templateUrl: './PrintRepository.html',
})

export class PrintRepositoryComponent {
    PrintRepos: FormGroup;
    submitted = false;
    subcategory = false;
    loading = false;
    Material: string;
    listofdropdown: listofdropdown[];
    Company: COMPANY[];
    Unit: Units[];
    Category: Material[];
    SubCategory: SubCategory[];
    PrintRepository: PrintRepository;
    PrintRepositorys: PrintRepository[];
  btnvisibility: boolean = true;
  itemreceived: orderreceived[];
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  role = false;
    constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

    }
    
    ngOnInit() {
        this.GetCategoryDropdown();
        this.PrintRepos = this.formbuilder.group({
           
            Category: ['', Validators.required],
            ANNUAL_REQUIREMENT: [],
            Brand: ['', Validators.required],
            GST_RATE: ['', Validators.required],
            RATE: [],
            GST_AMOUNT: [],
            UNIT: ['', Validators.required],
            Total_Item_Order: ['', Validators.required],
    //        Total_Item_Received: ['', Validators.required],
            DATEOFORDER: ['', Validators.required],
            SUBCATEGORY: [],
            SUBCHILDCATEGORY: [],
          TIMEOFORDER: ['', Validators.required],
          ORDERRECEIVED: this.formbuilder.array([this.addSkillFormGroup()])
     //       TIMEOFRECEIVED: ['', Validators.required],
      //      DATEOFRECEIVED: ['', Validators.required]
        })
        let empid = localStorage.getItem('editPrintRepositoryId');

        if (+empid > 0) {
            this.Componentservices.getPrint_RepositoryId(+empid).subscribe(data => {
                this.PrintRepositorys = data,
                console.log(this.PrintRepositorys)
              this.itemreceived = this.PrintRepositorys[0].ORDERRECEIVED;
                this.PrintRepos.controls['Category'].setValue(this.PrintRepositorys[0].CATEGORY);
                this.PrintRepos.controls['Brand'].setValue(this.PrintRepositorys[0].BRAND);
                this.PrintRepos.controls['ANNUAL_REQUIREMENT'].setValue(this.PrintRepositorys[0].ANNUAL_REQUIREMENT);

                this.PrintRepos.controls['UNIT'].setValue(this.PrintRepositorys[0].UNIT);
                this.PrintRepos.controls['GST_RATE'].setValue(this.PrintRepositorys[0].GST_RATE);
                this.PrintRepos.controls['RATE'].setValue(this.PrintRepositorys[0].RATE);
                this.PrintRepos.controls['GST_AMOUNT'].setValue(this.PrintRepositorys[0].GST_AMOUNT);

                this.PrintRepos.controls['Total_Item_Order'].setValue(this.PrintRepositorys[0].TOTAL_ITEM_ORDER);
          //      this.PrintRepos.controls['Total_Item_Received'].setValue(this.PrintRepositorys[0].TOTAL_ITEM_RECEIVED);
          //      this.PrintRepos.controls['DATEOFRECEIVED'].setValue(this.PrintRepositorys[0].DATEOFRECEIVED);
                this.PrintRepos.controls['DATEOFORDER'].setValue(this.PrintRepositorys[0].DATEOFORDER);
                this.PrintRepos.controls['SUBCATEGORY'].setValue(this.PrintRepositorys[0].SUBCATEGORY);
                this.PrintRepos.controls['SUBCHILDCATEGORY'].setValue(this.PrintRepositorys[0].SUBCHILDCATEGORY);
                this.PrintRepos.controls['TIMEOFORDER'].setValue(this.PrintRepositorys[0].TIMEOFORDER);
        //        this.PrintRepos.controls['TIMEOFRECEIVED'].setValue(this.PrintRepositorys[0].TIMEOFRECEIVED);
              var roleuser = this.Componentservices.rolebyuser;
              var role1 = roleuser.substr(1, roleuser.length - 2);
              if (role1 == "admin") {
                alert("admin");
                this.role = false;
              }
              else {
                alert("user");

                this.role = true;




              }
              if (this.itemreceived.length > 0) {
                for (var i = 0; i < this.itemreceived.length - 1; i++) {
                  this.addSkillButtonClick();

                }
                console.log(this.itemreceived);

              }
              this.ORDERRECEIVED.patchValue(this.itemreceived);
            })

            this.btnvisibility = false;
        }
    }
  get ORDERRECEIVED(): FormArray {
    return this.PrintRepos.get('ORDERRECEIVED') as FormArray;
  }
  addSkillButtonClick(): void {
    (<FormArray>this.PrintRepos.get('ORDERRECEIVED')).push(this.addSkillFormGroup());
  }

  addSkillFormGroup(): FormGroup {
    return this.formbuilder.group({
     ID:[0],
      DATEOFRECEIVED: ['', Validators.required],
      TIMEOFRECEIVED: ['', Validators.required],
      TOTAL_ITEM_RECEIVED: ['', Validators.required]
    });
  }
    GetCategoryDropdown() {
        this.Componentservices.GetMaterialforstaOrprint("Print").subscribe(data => {
            this.listofdropdown = data; console.log(this.Category);
            this.Company = this.listofdropdown[0].Company;
            this.Category = this.listofdropdown[0].Material;
            this.Unit = this.listofdropdown[0].Unit;
            console.log(this.Company);
        })
    }
  get f() { return this.PrintRepos.controls; }

  chechgreaterthan(): boolean {
    var str = this.PrintRepos.controls["Total_Item_Order"].value;

    var str1 = 0;
    for (let control of this.ORDERRECEIVED.controls) {
      str1 += parseInt(control.get('TOTAL_ITEM_RECEIVED').value);
    }

    if (+str < +str1) {
      alert("Total Item Order is greater than Total Item Received");
      return false;
    }
    else {

      return true;
    }



  }
  deleteitem(deleteitem: number) {
    var item = (<FormArray>this.PrintRepos.get('ORDERRECEIVED')).at(deleteitem);
    var items = item.get('ID').value;

    var conf = confirm("Are you sure you want to delete this ?");
    if (conf == true) {
      if (items != 0) {
        this.Componentservices
          .Deletereceiveditem(deleteitem)
          .subscribe(data => {
          this.Material = data, alert(this.Material), this.loading = false; console.log(this.Material);
          
          },
            error => () => {

            },
            () => console.log(this.Material)
          );
      }
      (<FormArray>this.PrintRepos.get('ORDERRECEIVED')).removeAt(deleteitem);
      }

  }


    onSubmit() {
        this.submitted = true;

        if (this.PrintRepos.invalid) {
            return;
        }
      if (!this.chechgreaterthan())
        return false;
        this.loading = true;
        this.Componentservices
            .SavePrint_Repository(this.PrintRepos.value)
          .subscribe(data => { this.Material = data, alert(this.Material), this.loading = false; console.log(this.Material); this.router.navigate(['stationary/GetPrintRepository'] ); },
                error => () => {

                },
                () => console.log(this.Material)
            );

    }
    categorychangeload(value) {
        this.Componentservices.Getsubcategoryonchange(value).subscribe(data => {
            this.SubCategory = data; console.log(this.SubCategory);
            if (this.SubCategory.length > 0) {
                this.subcategory = true;
            }
            else {
                this.subcategory = false;
                this.PrintRepos.controls['SUBCATEGORY'].setValue(null);
                this.PrintRepos.controls['SUBCHILDCATEGORY'].setValue(null);

            }
        })

    }
    categorychange(value: string) {
        this.categorychangeload(value);


    }
    onUpdate() {
        this.submitted = true;

        if (this.PrintRepos.invalid) {
            return;
        }
      if (!this.chechgreaterthan())
        return false;
        this.loading = true;
        this.Componentservices
            .UpdatePrint_Repository(this.PrintRepos.value)
          .subscribe(data => { this.Material = data, alert(this.Material), this.loading = false; console.log(this.Material); this.router.navigate(['stationary/GetPrintRepository']); },
                error => () => {

                },
                () => console.log(this.Material)
            );
    }
}



