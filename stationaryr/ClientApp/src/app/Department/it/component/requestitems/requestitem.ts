import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ComponentService } from '../../../../services/ComponentService';
import { Router, ActivatedRoute } from '@angular/router';
import { Material, SubCategory, ititems, itissueitems, listofdropdown } from '../../../../TableEntity/TableEntityClass';
import { setTimeout } from 'timers';
@Component({
  selector: 'requestitem',
  templateUrl: 'requestitem.html'
})

export class requestitem implements OnInit, AfterContentChecked {
  RequestForm: FormGroup;
  Category: Material[];
  SubCategory: SubCategory[] = [];
  listofdropdown: listofdropdown[];
  finaldata: any[] = [];
  subcategory = true;
  subchildcategory = true;
  btnvisibility: boolean = true;
  submitted = false;
  loading = false;
  datasubmit: string;
  itemreceived: ititems[];
  itissueitem: itissueitems[];
  itissueitems: itissueitems[];
  constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {


  }
  
  ngAfterContentChecked(){
   

  }

  ngOnInit() {
    this.GetCategoryDropdown();
    this.getSubCategories();
    this.RequestForm = this.formbuilder.group({

     
      ORDERITEM: this.formbuilder.array([this.addItemFormGroup()])


    })


    let empid = localStorage.getItem('editissueitemId');

    if (empid != null) {
      this.Componentservices.GetItIssueItemsById(empid).subscribe(data => {
        this.itissueitems = data,
          this.itemreceived = [];
        this.itemreceived = this.itissueitems[0].ORDERITEM;
        if (this.itemreceived.length > 0) {

          for (var i = 0; i <= this.itemreceived.length - 1; i++) {
            if (i != 0) {
              this.addItemButtonClick();
            }
            this.ORDERITEM.at(i).get('CATEGORY').setValue(this.itemreceived[i].CATEGORY);
            this.ORDERITEM.at(i).get('QUANTITY').setValue(this.itemreceived[i].QUANTITY);
            this.setcategorychangeload(this.itemreceived[i].CATEGORY, i);
         
           
          }
        }

        console.log(this.itemreceived);
      })
    }
  }

 
  categorychange(value: string, i: number) {
    console.log(value);
    this.categorychangeload(value, i);


  }
  setcategorychangeload(value, i) {

    this.finaldata[i] = this.SubCategory.filter(x => x.PARENT_ID == value);
   // this.ORDERITEM.at(i).get('SUBCATEGORY').setValue(this.itemreceived[j].SUBCATEGORY);

    console.log(this.finaldata[i]);

  }
  categorychangeload(value, i) {
    
    this.finaldata[i] = this.SubCategory.filter(x => x.PARENT_ID == value);
    console.log(this.finaldata[i]);

  }

  avaiablequantity() {


  }
  getSubCategories() {

    this.Componentservices.Getsubcategoryonchange("1").subscribe(data => {
      this.SubCategory = data;
      console.log(this.SubCategory);
    });
    

  }
  addItemButtonClick(): void {
    (<FormArray>this.RequestForm.get('ORDERITEM')).push(this.addItemFormGroup());
  }
  get f() { return this.RequestForm.controls; }
  addItemFormGroup(): FormGroup {
    return this.formbuilder.group({
      ID: [0],
      CATEGORY: ['', Validators.required],
      SUBCATEGORY: [],
      SUBCHILDCATEGORY: [],
      QUANTITY: ['', Validators.required]
    });
  }


  GetCategoryDropdown() {
    this.Componentservices.GetMaterialforstaOrprint("IT").subscribe(data => {
      this.listofdropdown = data; console.log(this.Category);

      this.Category = this.listofdropdown[0].Material;

    })
  }
  get ORDERITEM(): FormArray {
    return this.RequestForm.get('ORDERITEM') as FormArray;
  }
  deleteitem(deleteitem: number) {
    var item = this.ORDERITEM.at(deleteitem);
    var items = item.get('ID').value;

    var conf = confirm("Are you sure you want to delete this ?");
    if (conf == true) {
      if (items != 0) {

      }
      (<FormArray>this.RequestForm.get('ORDERITEM')).removeAt(deleteitem);
    }
  }
  subcategorychange(value, i) {
    console.log(value);
    var item = this.ORDERITEM.at(i);
    item.get('SUBCATEGORY').setValue(value, {
      onlySelf: true
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.RequestForm.invalid) {
      return;
    }
    this.loading = true;

    this.Componentservices
      .SaveItIssueItems(this.RequestForm.value)
      .subscribe(data => { this.datasubmit = data, this.loading = false; console.log(this.datasubmit); this.router.navigate(['IT/GetRequestItems']); },
        error => () => {

        },
        () => console.log(this.datasubmit)
      );


  }


  onUpdate() {
    this.submitted = true;

    if (this.RequestForm.invalid) {
      return;
    }
    this.loading = true;

    this.Componentservices
      .UpdateIssueItems(this.RequestForm.value)
      .subscribe(data => { this.datasubmit = data, this.loading = false; console.log(this.datasubmit); this.router.navigate(['IT/GetRequestItems']); },
        error => () => {

        },
        () => console.log(this.datasubmit)
      );

  }
}
