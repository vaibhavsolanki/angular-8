import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentService } from '../../../../services/ComponentService';
import { StationaryRepository, orderreceived, SubCategory, Material, COMPANY, listofdropdown, Units } from '../../../../TableEntity/TableEntityClass';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
    selector: 'app-stationaryrepository',
    templateUrl: './StationaryRepository.html',
})

export class StationaryRepositoryComponent {

    StationaryRepository: FormGroup;
  submitted = false;
  count: number = 0;
    subcategory = false;
    subchildcategory = false;
    loading = false;
    Material: string;
    listofdropdown: listofdropdown[];
    Company: COMPANY[];
    Unit: Units[];
    Category: Material[];
    SubCategory: SubCategory[];
    SubChildCategory: SubCategory[];
    stationary: StationaryRepository;
  stationarys: StationaryRepository[];
  itemreceived: orderreceived[];
  btnvisibility: boolean = true;
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  role = false;
    constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {
    
    }
    
  ngOnInit() {
    
        this.GetCategoryDropdown();
        this.StationaryRepository = this.formbuilder.group({
           
          Category: ['', Validators.required],
          
          Company: ['', Validators.required],
          Estimated_Quantity: ['', Validators.required],
          UNIT: ['', Validators.required],
          Basic_Amount: ['', Validators.required],
          Total_Item_Order: ['', Validators.required],
           
          GST: ['', Validators.max(100)],
       
          DATEOFORDER: ['', Validators.required],
          TIMEOFORDER: ['', Validators.required],
          
          SUBCATEGORY: [''],
          SUBCHILDCATEGORY: [''],
          ORDERRECEIVED: this.formbuilder.array([this.addSkillFormGroup()])
        })
        let empid = localStorage.getItem('editStationaryRepositoryId');

    if (+empid > 0) {
     
            this.Componentservices.getStationary_RepositoryId(+empid).subscribe(data => {
              this.stationarys = data,
                this.itemreceived=  this.stationarys[0].ORDERRECEIVED;
                    console.log(this.stationarys)
                this.StationaryRepository.controls['Category'].setValue(this.stationarys[0].CATEGORY);
                this.StationaryRepository.controls['Company'].setValue(this.stationarys[0].COMPANY);
                this.StationaryRepository.controls['Estimated_Quantity'].setValue(this.stationarys[0].ESTIMATED_QUANTITY);

                this.StationaryRepository.controls['UNIT'].setValue(this.stationarys[0].UNIT);
                this.StationaryRepository.controls['Basic_Amount'].setValue(this.stationarys[0].BASIC_AMOUNT);
                this.StationaryRepository.controls['GST'].setValue(this.stationarys[0].GST);

                this.StationaryRepository.controls['Total_Item_Order'].setValue(this.stationarys[0].TOTAL_ITEM_ORDER);
               // this.StationaryRepository.controls['Total_Item_Received'].setValue(this.stationarys[0].TOTAL_ITEM_RECEIVED);
              //  this.StationaryRepository.controls['DATEOFRECEIVED'].setValue(this.stationarys[0].DATEOFRECEIVED);
                this.StationaryRepository.controls['DATEOFORDER'].setValue(this.stationarys[0].DATEOFORDER);
                this.StationaryRepository.controls['TIMEOFORDER'].setValue(this.stationarys[0].TIMEOFORDER);
               // this.StationaryRepository.controls['TIMEOFRECEIVED'].setValue(this.stationarys[0].TIMEOFRECEIVED);

                if (this.stationarys[0].SUBCATEGORY != "") {
                    this.subcategory = true;
                    this.categorychange(this.stationarys[0].CATEGORY);
                    this.StationaryRepository.controls['SUBCATEGORY'].setValue(this.stationarys[0].SUBCATEGORY);
                }
                if (this.stationarys[0].SUBCHILDCATEGORY != "") {
                    this.subchildcategory = true;
                    this.subcategorychange(this.stationarys[0].SUBCATEGORY);
                    this.StationaryRepository.controls['SUBCHILDCATEGORY'].setValue(this.stationarys[0].SUBCHILDCATEGORY);
              }
             
              if (this.itemreceived.length > 0) {
                for (var i = 0; i <this.itemreceived.length - 1;i++) {
                  this.addSkillButtonClick();
                 
                }
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
                console.log(this.itemreceived);

              }
              this.ORDERRECEIVED.patchValue(this.itemreceived);
            })

            this.btnvisibility = false;
    }
   
  }
  enabledinput() {
    this.StationaryRepository.controls['Category'].enable({ onlySelf: true });
    this.StationaryRepository.get('Category').enable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('SUBCATEGORY').enable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('SUBCHILDCATEGORY').enable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('Company').enable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('Estimated_Quantity').enable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('UNIT').enable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('GST').enable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('Basic_Amount').enable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('Total_Item_Order').enable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('TIMEOFORDER').enable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('DATEOFORDER').enable({ onlySelf: true, emitEvent: false })


  }
  diabledinput() {
    this.StationaryRepository.controls['Category'].disable({ onlySelf: true });
    this.StationaryRepository.get('Category').disable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('SUBCATEGORY').disable({ onlySelf: true, emitEvent: false  })
    this.StationaryRepository.get('SUBCHILDCATEGORY').disable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('Company').disable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('Estimated_Quantity').disable({ onlySelf: true, emitEvent: false  })
    this.StationaryRepository.get('UNIT').disable({ onlySelf: true, emitEvent: false  })
    this.StationaryRepository.get('GST').disable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('Basic_Amount').disable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('Total_Item_Order').disable({ onlySelf: true, emitEvent: false })
    this.StationaryRepository.get('TIMEOFORDER').disable({ onlySelf: true, emitEvent: false  })
    this.StationaryRepository.get('DATEOFORDER').disable({ onlySelf: true, emitEvent: false  })
 

  }
  get ORDERRECEIVED(): FormArray {
    return this.StationaryRepository.get('ORDERRECEIVED') as FormArray;
  }
  addSkillButtonClick(): void {
    (<FormArray>this.StationaryRepository.get('ORDERRECEIVED')).push(this.addSkillFormGroup());
  }

  addSkillFormGroup(): FormGroup {
    return this.formbuilder.group({
     ID:[0],
      DATEOFRECEIVED: ['', Validators.required],
      TIMEOFRECEIVED: ['', Validators.required],
      TOTAL_ITEM_RECEIVED: ['', Validators.required]
    });
  }
    categorychangeload(value) {
        this.Componentservices.Getsubcategoryonchange(value).subscribe(data => {
            this.SubCategory = data; console.log(this.SubCategory);
          
            if (this.SubCategory.length > 0) {
                this.subcategory = true;
            }
            else {
                this.subcategory = false;
                this.StationaryRepository.controls['SUBCATEGORY'].setValue(null);
                this.StationaryRepository.controls['SUBCHILDCATEGORY'].setValue(null);

            }
        })

    }
    subcategorychange(value) {
        this.Componentservices.Getsubcategoryonchange(value).subscribe(data => {
            this.SubChildCategory = data; console.log(this.SubCategory);

            if (this.SubChildCategory.length > 0) {
                this.subchildcategory = true;
            }
            else {
                this.subchildcategory = false;
                //this.StationaryRepository.controls['SUBCATEGORY'].setValue(null);
                this.StationaryRepository.controls['SUBCHILDCATEGORY'].setValue(null);

            }
        })

    }
    categorychange(value: string) {
        this.categorychangeload(value);
       

    }
    GetCategoryDropdown() {
        this.Componentservices.GetMaterialforstaOrprint("Stationary").subscribe(data => {
            this.listofdropdown = data; console.log(this.Category);
            this.Company = this.listofdropdown[0].Company;
            this.Category = this.listofdropdown[0].Material;
            this.Unit = this.listofdropdown[0].Unit;
            console.log(this.Company);
        })
    }

   
   get f() { return this.StationaryRepository.controls; }

  chechgreaterthan(): boolean {
    var str = this.StationaryRepository.controls["Total_Item_Order"].value;
  
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
    var item = this.ORDERRECEIVED.at(deleteitem);
    var items = item.get('ID').value;
   
    var conf = confirm("Are you sure you want to delete this ?");
    if (conf == true) {
      if (items != 0) {


        this.Componentservices
          .Deletereceiveditem(items)
          .subscribe(data => {
          this.Material = data, alert(this.Material), this.loading = false; console.log(this.Material);
          
          },
            error => () => {

            },
            () => console.log(this.Material)
          );

      }
      (<FormArray>this.StationaryRepository.get('ORDERRECEIVED')).removeAt(deleteitem);
    }
    

  }


    onSubmit() {
       
        this.submitted = true;

        if (this.StationaryRepository.invalid) {
            return;
      }
    
      if (!this.chechgreaterthan())
        return false;
    
    
        this.loading = true;
        this.Componentservices
            .SaveStationary_Repository(this.StationaryRepository.value)
            .subscribe(data => { this.Material = data, alert(this.Material), this.loading = false; console.log(this.Material); this.router.navigate(['stationary/StationaryRepository']); },
                error => () => {

                },
                () => console.log(this.Material)
            );

    }
    onUpdate() {
       
        this.submitted = true;
     
        if (this.StationaryRepository.invalid) {
            return;
      }
      if (!this.chechgreaterthan())
        return false;
      this.chechgreaterthan() 
      this.loading = true;
      
        this.Componentservices
            .UpdateStationary_Repository(this.StationaryRepository.value)
          .subscribe(data => { this.Material = data, alert(this.Material), this.loading = false; console.log(this.Material); this.router.navigate(['stationary/StationaryRepository']); },
                error => () => {

                },
                () => console.log(this.Material)
            );
    }
}



