import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ComponentService } from '../../../../services/ComponentService';
import { Router, ActivatedRoute } from '@angular/router';
import { contract, listofdropdown, Material, SubCategory } from '../../../../TableEntity/TableEntityClass';
@Component({
  selector: 'app-itcontactmaster',
  templateUrl: './contractmasterit.html',
})

export class itcontractmaster implements OnInit {

  ContractForm: FormGroup;
  submitted = false;
  loading = false;
  datasubmit: string;
  Contract: contract;
  Contracts: contract[];
  listofdropdown: listofdropdown[];
  Category: Material[];
  SubCategory: SubCategory[];
  SubChildCategory: SubCategory[];
  subcategory = true;
  subchildcategory = true;
 private prices = [];
  btnvisibility: boolean = true;
  constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {


  }
  ngOnInit() {
    this.GetCategoryDropdown();
    this.ContractForm = this.formbuilder.group({

      CONTRACTNO: ['', Validators.required],
      VENDORNAME: ['', Validators.required],
      STARTDATE: ['', Validators.required],
      ENDDATE: ['', Validators.required],
      ORDERITEM: this.formbuilder.array([this.addItemFormGroup()])

     
    })
    let empid = localStorage.getItem('editContractId');

    if (+empid > 0) {
      this.Componentservices.getContractformId(+empid).subscribe(data => {
        this.Contracts = data,
          console.log(this.data),
          this.ContractForm.controls['CONTRACTNO'].setValue(this.Contracts[0].CONTRACTNO);
        this.ContractForm.controls['VENDORNAME'].setValue(this.Contracts[0].VENDORNAME);
        this.ContractForm.controls['STARTDATE'].setValue(this.Contracts[0].STARTDATE);
        this.ContractForm.controls['ENDDATE'].setValue(this.Contracts[0].ENDDATE);
        this.ContractForm.controls['ID'].setValue(this.Contracts[0].ID);
      })

      this.btnvisibility = false;
    }
  }


  categorychangeload(value, i) {

    var item = this.ORDERITEM.at(i);
   

    this.Componentservices.Getsubcategoryonchange(value).subscribe(data => {



    // item.setValue['SUBCATEGORY']= data; console.log(this.SubCategory);
item.controls['SUBCATEGORY'].setValue( data);

this.SubCategory=item.get('SUBCATEGORY').value;
console.log(item);
     // if (this.SubCategory.length > 0) {
        //this.subcategory = true;
      //}
     // else {
       // this.subcategory = false;
       // this.ContractForm.controls['SUBCATEGORY'].setValue(null);
        //this.ContractForm.controls['SUBCHILDCATEGORY'].setValue(null);

      //}
    })

  }

  categorychange(value: string,i:number) {
    this.categorychangeload(value,i);


  }

getarray(sub):any[]{
 let array = [];
  for(let key in sub){
   if(sub.hasOwnProperty(key)){
     array.push(sub[key]);
   }
  }
return array;
}

  subcategorychange(value,i) {
console.log(value);
var item = this.ORDERITEM.at(i);
var aa=item.get('SUBCATEGORY').value

   this.Componentservices.Getsubcategoryonchange(aa).subscribe(data => {
item.controls['SUBCHILDCATEGORY'].setValue( data);
     // this.SubChildCategory = data; console.log(this.SubCategory);

      //if (this.SubChildCategory.length > 0) {
     //   //this.subchildcategory = true;
     //}
     // else {
        //this.subchildcategory = false;
        //this.StationaryRepository.controls['SUBCATEGORY'].setValue(null);
        //this.ContractForm.controls['SUBCHILDCATEGORY'].setValue(null);
//}
   })

  }
  addItemButtonClick(): void {
    (<FormArray>this.ContractForm.get('ORDERITEM')).push(this.addItemFormGroup());
  }

  addItemFormGroup(): FormGroup {
    return this.formbuilder.group({
      ID: [0],
      CATEGORY: ['', Validators.required],
      SUBCATEGORY: [],
      SUBCHILDCATEGORY: [],
      QUANTITY: ['', Validators.required]
    });
  }
  get f() { return this.ContractForm.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.ContractForm.invalid) {
      return;
    }
    this.loading = true;

    this.Componentservices
      .SaveContractform(this.ContractForm.value)
      .subscribe(data => { this.datasubmit = data, this.loading = false; console.log(this.datasubmit); this.router.navigate(['IT/GetContractMaster']); },
        error => () => {

        },
        () => console.log(this.datasubmit)
      );


  }
  onUpdate() {
  this.submitted = true;

    if (this.ContractForm.invalid) {
      return;
    }
    this.loading = true;

    this.Componentservices
      .SaveContractform(this.ContractForm.value)
      .subscribe(data => { this.datasubmit = data, this.loading = false; console.log(this.datasubmit); this.router.navigate(['IT/GetContractMaster']); },
        error => () => {

        },
        () => console.log(this.datasubmit)
      );

  }
  GetCategoryDropdown() {
    this.Componentservices.GetMaterialforstaOrprint("IT").subscribe(data => {
      this.listofdropdown = data; console.log(this.Category);
   
      this.Category = this.listofdropdown[0].Material;
      
    })
  }



  get ORDERITEM(): FormArray {
    return this.ContractForm.get('ORDERITEM') as FormArray;
  }
  deleteitem(deleteitem: number) {
    var item = this.ORDERITEM.at(deleteitem);
    var items = item.get('ID').value;

    var conf = confirm("Are you sure you want to delete this ?");
    if (conf == true) {
      if (items != 0) {


        //this.Componentservices
        //  .Deletereceiveditem(items)
        //  .subscribe(data => {
        //    this.Material = data, alert(this.Material), this.loading = false; console.log(this.Material);

        //  },
        //    error => () => {

        //    },
        //    () => console.log(this.Material)
        //  );

      }
      (<FormArray>this.ContractForm.get('ORDERITEM')).removeAt(deleteitem);
    }


  }

}


