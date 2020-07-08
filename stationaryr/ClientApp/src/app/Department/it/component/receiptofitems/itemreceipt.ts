import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { itreleaseorder, itemreceipt,contract, ititems, listofdropdown, Material, SubCategory} from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'itemreceipt',
  templateUrl: 'itemreceipt.html'
})

export class itemreceipts {

  submitted = false;
  loading = false;
  ItemReceiptForm: FormGroup;
  contracts: contract[];
  itreleaseorders: itreleaseorder[];
  items: ititems[] = [];
  items1: ititems[] = [];
  itemreceipt: itemreceipt[];
  itemreceipts: itemreceipt[];
  listofdropdown: listofdropdown[];
  Category: Material[];
  SubCategory: SubCategory[];
  dataSource;
  contractno: string;
  showitem: boolean = false;
  values: number;
  btnvisibility: boolean = true;
  datasubmit: string;
  Disabled = false;
  displayedColumns: string[] = ['position', 'CATEGORY', 'QUANTITY', 'RECEIVEDQUANTITY','REMAININGQUANTITY','REMARK'];
    formGroup: any;
  constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

  }
  ngOnInit() {
    this.getpublishorder();
    this.GetCategoryDropdown();
    this.getSubCategories();
    let empid = localStorage.getItem('viewitemreceiptId');
    if (empid != null) {
      this.Componentservices.GetItItemReceiptById(+empid).subscribe(data => {
        this.itemreceipts = data
        this.items1 = this.itemreceipts[0].ORDERITEM;
        console.log("ss"); console.log(this.items1)
        this.ItemReceiptForm.controls["PUBLISHORDER"].setValue(this.itemreceipts[0].PUBLISHORDER);
        this.pubitem(this.itemreceipts[0].PUBLISHORDER)
        
        this.ItemReceiptForm.controls["CHALLANNO"].setValue(this.itemreceipts[0].CHALLANNO);

        this.ItemReceiptForm.controls["CHALLANDATE"].setValue(this.itemreceipts[0].CHALLANDATE);

        this.ItemReceiptForm.controls["RECEIPTDATE"].setValue(this.itemreceipts[0].RECEIPTDATE);
        this.ItemReceiptForm.controls["REMARKS"].setValue(this.itemreceipts[0].REMARKS);
        this.items.map((x, i) => {

          this.items[i].REMAINING = "0";
          this.items[i].REMARKS = "rr";
      })
        
        this.Disabled = true;
        console.log(data);
      });
    }
    
    this.ItemReceiptForm = this.formbuilder.group({

      PUBLISHORDER: ['', Validators.required],
      CHALLANNO: ['', Validators.required],
      CHALLANDATE: ['', Validators.required],
      RECEIPTDATE: ['', Validators.required],
      REMARKS:[]
      //ORDERITEM: this.formbuilder.array([this.addquantity()])
    }
    );
  }

 

  GetCategoryDropdown() {
    this.Componentservices.GetMaterialforstaOrprint("IT").subscribe(data => {
      console.log(data);
      this.listofdropdown = data
      this.Category = this.listofdropdown[0].Material;
    })
  }
  getSubCategories() {

    this.Componentservices.Getsubcategoryonchange("1").subscribe(data => {
      this.SubCategory = data;
      console.log(data);
    });
 }
 
  onKeyUp(event: any,i) {
    this.values = event.target.value;
    console.log(this.values)
    console.log(i)
    this.items[i].RECEIVEDQUANTITY = this.values.toString();
    this.items[i].REMAINING = "0";
 
    this.items[i].REMAINING = (Number(this.items[i].QUANTITY) - Number(this.values)).toString();
    if (parseInt(this.items[i].REMAINING) < 0) {
      alert("Received quantity less than or equal to Avaiable quantity");
      this.items[i].REMAINING = "";
     
      this.items[i].RECEIVEDQUANTITY ="";
    }
    else {
      this.items[i].RECEIVEDQUANTITY = this.values.toString();
    }
    
   

  }
  onKeyPress(event: any, i:number) {
    this.items[i].REMARKS = event.target.value;
  }

  
  getpublishorder() {
    this.Componentservices
      .getreleaseorder().subscribe(
        data => {
          this.itreleaseorders = data, console.log(this.itreleaseorders)

});
  }


  pubitem(value: string) {
    
    this.showitem = true;
    var contractno = this.itreleaseorders.find(x => x.ID == Number(value)).CONTRACTNO;
    this.contractno= this.itreleaseorders.find(x => x.ID == Number(value)).CONTRACTID;
   
    this.getcontractbyid(contractno);
   

  }
  get f() { return this.ItemReceiptForm.controls; }
  onSubmit() {

    this.submitted = true;

    if (this.ItemReceiptForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.items)
    for (var i = 0;i<= this.items.length - 1; i++) {

      var cate = this.items[i].CATEGORY.split('  ');
      this.items[i].CATEGORY = this.Category.find(x => x.ITEMS_DESCRIPTION == cate[0]).ID.toString();
      if (this.items[i].SUBCATEGORY != ' ') {
        this.items[i].SUBCATEGORY = this.SubCategory.find(y => y.DESCRIPTION == this.items[i].SUBCATEGORY).ID.toString();

      }
      else {
        this.items[i].SUBCATEGORY = null;
      }
      if (this.items[i].SUBCHILDCATEGORY != ' ') {
        this.items[i].SUBCHILDCATEGORY = this.SubCategory.find(y => y.DESCRIPTION == this.items[i].SUBCHILDCATEGORY).ID.toString();
      }
      else {
        this.items[i].SUBCHILDCATEGORY = null;
      }
    }
    this.Componentservices
      .SaveItItemReceipt(this.ItemReceiptForm.value, this.items)
      .subscribe(data => { this.datasubmit = data, this.loading = false; console.log(this.datasubmit); this.router.navigate(['IT/GetItemReceipt']); },
        error => () => {

        },
        () => console.log(this.datasubmit)
      );
  }

  //onUpdate() {
  //  this.submitted = true;

  //  if (this.ItemReceiptForm.invalid) {
  //    return;
  //  }
  //  this.loading = true;

  //  this.Componentservices
  //    .UpdateContractform(this.ItemReceiptForm.value)
  //    .subscribe(data => { this.datasubmit = data, this.loading = false; console.log(this.datasubmit); this.router.navigate(['IT/GetContractMaster']); },
  //      error => () => {

  //      },
  //      () => console.log(this.datasubmit)
  //    );

  //}



 async getcontractbyid(value: string) {
    await this.Componentservices.getContractformId(value).subscribe(data => {
      this.contracts = data
      this.items = [];


      this.items = this.contracts[0].ORDERITEM;

      //this.items.sort(function (a, b) { return parseInt(a.CATEGORY) - parseInt(b.CATEGORY); });
      //this.items1.sort(function (a, b) { return parseInt(a.CATEGORY) - parseInt(b.CATEGORY); });
      this.items.map((x, i) => {
        let cate = "";
        cate = this.Category.find(y => y.ITEMCODE == x.CATEGORY).ID.toString();
        this.items[i].CATEGORY == null ? this.items[i].CATEGORY = "" : this.items[i].CATEGORY = this.Category.find(y => y.ITEMCODE == x.CATEGORY).ITEMS_DESCRIPTION;
        this.items[i].SUBCATEGORY == null ? this.items[i].SUBCATEGORY = " " : this.items[i].SUBCATEGORY = this.SubCategory.find(y => y.ID.toString() == x.SUBCATEGORY).DESCRIPTION;
        this.items[i].SUBCHILDCATEGORY == null ? this.items[i].SUBCHILDCATEGORY = " " : this.items[i].SUBCHILDCATEGORY = this.SubCategory.find(y => y.ID.toString() == x.SUBCHILDCATEGORY).DESCRIPTION;
        console.log(x.CATEGORY);
      
        //cate = "";//this.Category.filter(function (arr) { return arr.ITEMCODE == x.CATEGORY });//this.Category.find(y => y.ITEMCODE == x.CATEGORY)[0].ID.toString();
        console.log(cate);
        this.items[i].CATEGORY = this.items[i].CATEGORY + "  " + this.items[i].SUBCATEGORY + "  " + this.items[i].SUBCHILDCATEGORY;

        this.items[i].RECEIVEDQUANTITY = this.items1.find(x => x.CATEGORY == cate)?.RECEIVEDQUANTITY;
        this.items[i].REMAINING = this.items1.find(x => x.CATEGORY == cate)?.REMAINING;
        this.items[i].REMARKS = this.items1.find(x => x.CATEGORY == cate)?.REMARKS;

      })
      console.log(this.contracts);
      this.dataSource = new MatTableDataSource<ititems>(this.items)

    });
  }
  
}
