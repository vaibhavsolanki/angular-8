import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, AfterViewChecked, AfterContentChecked, DoCheck, OnChanges, AfterContentInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ComponentService } from '../../../../services/ComponentService';
import { Router, ActivatedRoute } from '@angular/router';
import { contract, listofdropdown, Material, itvendor, SubCategory, ititems } from '../../../../TableEntity/TableEntityClass';
import { setTimeout } from 'timers';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-itcontactmaster',
  templateUrl: './contractmasterit.html',
})

export class itcontractmaster implements OnInit, AfterViewChecked {

  ContractForm: FormGroup;
  submitted = false;
  loading = false;
  datasubmit: string;
  Contract: contract;
  Contracts: contract[];
  itvendors: itvendor[];
  listofdropdown: listofdropdown[];
  Category: Material[];
  SubCategory: SubCategory[] = [];
  SubCategory1: SubCategory[];
  SubChildCategory: SubCategory[];
  subcategory = true;
  subchildcategory = true;
  itemreceived: ititems[];
  Subcategories: any[];
  GaganArr: any[] = [];
  btnvisibility: boolean = true;
  finaldata: any[] = [];
  constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {


  }

  @ViewChild("cntfield", null) contractfield: ElementRef;
  ngAfterViewChecked() {



    //if (this.itemreceived.length > 0) {
    //  for (var j = 0; j <= this.itemreceived.length - 1; j++) {
    //    this.categorychangeload(this.itemreceived[j].CATEGORY, j);
    //    this.ORDERITEM.at(j).get('SUBCATEGORY').setValue(this.itemreceived[j].SUBCATEGORY);
    //    console.log(this.itemreceived[j].SUBCATEGORY);
    //  }
    //}


  }
  //ngAfterViewInit() {

  //  this.contractfield.nativeElement.focus();    
  //}

  //ngDoCheck() {
  //  console.log(this.itemreceived.length);
  //  if (this.itemreceived.length > 0) {
  //    for (var j = 0; j <= this.itemreceived.length - 1; j++) {
  //      this.categorychangeload(this.itemreceived[j].CATEGORY, j);
  //      this.ORDERITEM.at(j).get('SUBCATEGORY').setValue(this.itemreceived[j].SUBCATEGORY);
  //    }
  //  }
  //}
  ngOnInit() {
    this.GetCategoryDropdown();
    this.getSubCategories();
    this.getvendor();
    this.ContractForm = this.formbuilder.group({

      CONTRACTNO: ['', Validators.required],
      VENDORNAME: ['', Validators.required],
      STARTDATE: ['', Validators.required],
      ENDDATE: ['', Validators.required],
      ORDERITEM: this.formbuilder.array([this.addItemFormGroup()])

    })
    let empid = localStorage.getItem('editContractId');

    if (empid != null) {
      this.Componentservices.getContractformId(empid).subscribe(data => {
        this.Contracts = data;
        this.itemreceived = [];
        this.itemreceived = this.Contracts[0].ORDERITEM;
        console.log(this.itemreceived.length + 'gagan');
        this.ContractForm.controls['CONTRACTNO'].setValue(this.Contracts[0].CONTRACTNO);
        this.ContractForm.controls['VENDORNAME'].setValue(this.Contracts[0].VENDORNAME);
        this.ContractForm.controls['STARTDATE'].setValue(this.Contracts[0].STARTDATE);
        this.ContractForm.controls['ENDDATE'].setValue(this.Contracts[0].ENDDATE);
        //this.ContractForm.controls['ID'].setValue(this.Contracts[0].ID);


        if (this.itemreceived.length > 0) {

          for (var i = 0; i <= this.itemreceived.length - 1; i++) {
            if (i != 0) {
              this.addItemButtonClick();
            }
            this.ORDERITEM.at(i).get('CATEGORY').setValue(this.itemreceived[i].CATEGORY);
            this.ORDERITEM.at(i).get('QUANTITY').setValue(this.itemreceived[i].QUANTITY);
            // this.ORDERITEM.at(i).get('SUBCATEGORY').setValue(this.itemreceived[i].SUBCATEGORY);
            this.categorychangeload(this.itemreceived[i].CATEGORY, i);
            console.log(this.itemreceived[i].SUBCATEGORY, this.itemreceived[i].CATEGORY);
            this.GaganArr.push(this.itemreceived[i].SUBCATEGORY);
          }
          console.log("dd" + this.GaganArr);
          this.gaganArrSet();
        }


      })
      console.log("dd1" + this.GaganArr);

      this.contractfield.nativeElement.focus();
      this.btnvisibility = false;
    }

  }

  gaganArrSet() {
    for (var i = 0; i < this.GaganArr.length; i++) {
      this.ORDERITEM.at(i).get('SUBCATEGORY').setValue(this.itemreceived[i].SUBCATEGORY);
      //  alert();
    }
    //alert('dd');
    console.log(this.GaganArr + "fgafdg");
  }

  getvendor() {

    this.Componentservices
      .GetItVendor().subscribe(
        data => {
          this.itvendors = data, console.log(this.itvendors)
        });
  }

  categorychangeload(value, j) {

    this.finaldata[j] = this.SubCategory.filter(x => x.PARENT_ID == value);
  }
  getSubCategories() {

    this.Componentservices.Getsubcategoryonchange("1").subscribe(data => {
      this.SubCategory = data;
    });
    console.log(this.SubCategory);
    return this.SubCategory

  }
  categorychange(value: string, i: number) {
    this.categorychangeload(value, i);
  }

  transform(objects: any = []) {
    return Object.values(objects);
  }
  subcategorychange(value, i) {
    console.log(value);
    var item = this.ORDERITEM.at(i);
    item.get('SUBCATEGORY').setValue(value, {
      onlySelf: true
    })

    // this.Componentservices.Getsubcategoryonchange(aa).subscribe(data => {
    //item.controls['SUBCHILDCATEGORY'].setValue( data);
    // this.SubChildCategory = data; console.log(this.SubCategory);

    //if (this.SubChildCategory.length > 0) {
    //   //this.subchildcategory = true;
    //}
    // else {
    //this.subchildcategory = false;
    //this.StationaryRepository.controls['SUBCATEGORY'].setValue(null);
    //this.ContractForm.controls['SUBCHILDCATEGORY'].setValue(null);
    //}
    // })

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
      .UpdateContractform(this.ContractForm.value)
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


