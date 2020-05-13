import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ComponentService } from '../../../../services/ComponentService';
import { Router, ActivatedRoute } from '@angular/router';
import { Material, SubCategory, ititems, itissueitems, listofdropdown, AdminIssue } from '../../../../TableEntity/TableEntityClass';
import { Department } from '../../../../TableEntity/TableEntityClass';
import { UserEdit } from '../../../../modal/edit-user.modal'
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
  values: number;
  Users: UserEdit[];
  Department: Department[];
  itemreceived: ititems[];
  itissueitem: AdminIssue[];
  itissueitems: AdminIssue[];
  GaganArr: any[] = [];
  constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {


  }
  
  ngAfterContentChecked(){
   

  }

  ngOnInit() {
    this.GetCategoryDropdown();
    this.getSubCategories();
   
    this.dghemployee();
    this.RequestForm = this.formbuilder.group({
      UserName: ['', Validators.required],
      ISSUEDATE: ['', Validators.required],
      
      ORDERITEM: this.formbuilder.array([this.addItemFormGroup()]),
      REMARKS:[],

    })


    let empid = localStorage.getItem('editissueitemId');

    if (empid != null) {
      this.Componentservices.GetItIssueItemsById(empid).subscribe(data => {
        this.itissueitems = data,
          this.btnvisibility = false;
          this.itemreceived = [];
        this.RequestForm.controls['UserName'].setValue(this.itissueitems[0].UserName);
        this.RequestForm.controls['ISSUEDATE'].setValue(this.itissueitems[0].ISSUEDATE);
        this.RequestForm.controls['REMARKS'].setValue(this.itissueitems[0].REMARKS);
        this.itemreceived = this.itissueitems[0].ORDERITEM;
        if (this.itemreceived.length > 0) {

          for (var i = 0; i <= this.itemreceived.length - 1; i++) {
            if (i != 0) {
              this.addItemButtonClick();
            }
            this.ORDERITEM.at(i).get('CATEGORY').setValue(this.itemreceived[i].CATEGORY);
            this.ORDERITEM.at(i).get('QUANTITY').setValue(this.itemreceived[i].QUANTITY);
            this.setcategorychangeload(this.itemreceived[i].CATEGORY, i);
            this.GaganArr.push(this.itemreceived[i].SUBCATEGORY);
           
          }
          this.gaganArrSet();
        }

        console.log(this.itemreceived);
      })
    }
  }
  onKeyUp(event: any, i) {
    this.values = event.target.value;
    console.log(this.values)
    console.log(i)
    //this.itemreceived[i].RECEIVEDQUANTITY = this.values.toString();
    //this.items[i].REMAINING = "0";

    //this.items[i].REMAINING = (Number(this.items[i].QUANTITY) - Number(this.values)).toString();
    //if (parseInt(this.items[i].REMAINING) < 0) {
    //  alert("");
    //  this.items[i].REMAINING = "";

    //  this.items[i].RECEIVEDQUANTITY = "";
    //}
    //else {s
    //  this.items[i].RECEIVEDQUANTITY = this.values.toString();
    //}



  }

  gaganArrSet() {
    for (var i = 0; i < this.GaganArr.length; i++) {
      this.ORDERITEM.at(i).get('SUBCATEGORY').setValue(this.GaganArr[i]);
      //  alert();
    }
    //alert('dd');
    console.log(this.GaganArr + "fgafdg");
  }
  dghemployee() {
    this.Componentservices.dghemployee('BOTH').subscribe(data => {
      this.Users = data;
      //  this.Department = this.Users[0].Department;
      console.log(this.Users);
      //  console.log(this.Department);
    });
  }
  departmentload() {
    this.Componentservices.department().subscribe(data => {
      // this.Users = data;
      this.Department = data;

    });
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
