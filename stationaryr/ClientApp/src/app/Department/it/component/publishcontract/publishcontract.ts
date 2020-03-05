import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ComponentService } from '../../../../services/ComponentService';
import { Router } from '@angular/router';
import { contract, itreleaseorder, itvendor, listofdropdown, Material, SubCategory, ititems } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'publishcontract',
  templateUrl: 'publishcontract.html'
})

export class publishcontract implements OnInit {
  contracts: contract[];
  contract: contract[];
  contractnos: string;
  contractstartdate: Date;
  contractenddate: Date;
  vendorname: string;
  releaseorder: string;
  releaseorderdate: Date;
  vendoraddress: string;
  itvendors: itvendor[];
  contractexist = false;
  itreleaseorder: itreleaseorder[];
  itorder: itreleaseorder[];
  items: ititems[] = [];
  listofdropdown: listofdropdown[];
  Category: Material[];
  SubCategory: SubCategory[];
  submitted = false;
  loading = false;
  btnvisibility: boolean = true;
  disabled = false;
  datasubmit: string;
  dataSource;
  insertreceipt: boolean = true;
  printreceipt: boolean = false;
  SUBJECT: string;
  BODY: string;
  RECEIVEDBY: string;
  SIGNATURE: string;
  RECEIVEDDATE: Date;
  displayedColumns: string[] = ['position','CATEGORY', 'QUANTITY'];

  constructor(private formbuilder: FormBuilder, private Componentservices: ComponentService, private router: Router) {

  }
  PublishContractForm: FormGroup;

  ngOnInit() {
    let empid = localStorage.getItem('viewPublishId');
    this.GetCategoryDropdown();
    this.getSubCategories();
    this.getcontract();
    if (empid != null) {
      this.insertreceipt = false;
      this.printreceipt = true;
      this.Componentservices.getreleaseorderbyid(+empid).subscribe(data => {
        this.itreleaseorder = data
        if (this.itreleaseorder.length > 0) {
          this.disabled = true;
          this.contractexist = true;
          this.releaseorder = this.itreleaseorder[0].RELEASEORDERID;
          this.releaseorderdate = this.itreleaseorder[0].RECEIVEDDATE;
          this.PublishContractForm.controls['CONTRACTID'].setValue(this.itreleaseorder[0].CONTRACTID);
          this.contractno(this.itreleaseorder[0].CONTRACTID);
          this.PublishContractForm.controls['SUBJECT'].setValue(this.itreleaseorder[0].SUBJECT);
          this.SUBJECT = this.itreleaseorder[0].SUBJECT;
          this.PublishContractForm.controls['BODY'].setValue(this.itreleaseorder[0].BODY);
          this.BODY = this.itreleaseorder[0].BODY;
          this.PublishContractForm.controls['SIGNATURE'].setValue(this.itreleaseorder[0].SIGNATURE);
          this.SIGNATURE = this.itreleaseorder[0].SIGNATURE;
          this.PublishContractForm.controls['RECEIVEDDATE'].setValue(this.itreleaseorder[0].RECEIVEDDATE);
          this.RECEIVEDDATE = this.itreleaseorder[0].RECEIVEDDATE;
          this.PublishContractForm.controls['RECEIVEDBY'].setValue(this.itreleaseorder[0].RECEIVEDBY);
          this.RECEIVEDBY=this.itreleaseorder[0].RECEIVEDBY

          console.log(this.itreleaseorder);

        
        }
        else {

          this.disabled = false;
          this.contractexist = false;
        }
      });
      this.releaseorder = null ? "XXXX" : this.releaseorder;
      this.releaseorderdate = null ? null : this.releaseorderdate;
      this.btnvisibility = false;
    }
  
 
    this.PublishContractForm = this.formbuilder.group({

      CONTRACTID: ['', Validators.required],
      SUBJECT: ['', Validators.required],
      BODY: ['', Validators.required],
      SIGNATURE: ['', Validators.required],
      RECEIVEDBY: ['', Validators.required],
      RECEIVEDDATE: ['', Validators.required]
    })
  }
  getcontract() {
    this.getpublishcontract();
    this.Componentservices
      .GetContractform().subscribe(
        data => {
          this.contracts = data;
         // this.contract.filter(x => x.CONTRACTNO = this.itorder.indexOf(x.CONTRACTNO)>0)
        }


    )
  }
  getpublishcontract() {
    this.Componentservices
      .getreleaseorder().subscribe(
        data => {
          this.itorder = data;
        });
  }
  contractno(value: string) {
    
    this.getcontractbyid(value);

  }
  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
  getcontractbyid(value: string) {
    this.Componentservices.getContractformId(value).subscribe(data => {
      this.contract = data
      if (this.contract.length > 0) {
        this.contractexist = true;
        this.contractnos = this.contract[0].CONTRACTNO;

        this.getvendor(this.contract[0].VENDORNAME);
     
        this.contractstartdate = this.contract[0].STARTDATE;
        this.contractenddate = this.contract[0].ENDDATE;
        this.items = [];
    

        this.items = this.contract[0].ORDERITEM;
        this.items.map((x, i) => {

          this.items[i].CATEGORY == null ? this.items[i].CATEGORY = "" : this.items[i].CATEGORY= this.Category.find(y => y.ITEMCODE == x.CATEGORY).ITEMS_DESCRIPTION;
          this.items[i].SUBCATEGORY == null ? this.items[i].SUBCATEGORY = " " : this.items[i].SUBCATEGORY = this.SubCategory.find(y => y.ID.toString() == x.SUBCATEGORY).DESCRIPTION;
          this.items[i].SUBCHILDCATEGORY == null ? this.items[i].SUBCHILDCATEGORY = " " : this.items[i].SUBCHILDCATEGORY = this.SubCategory.find(y => y.ID.toString() == x.SUBCHILDCATEGORY).DESCRIPTION;

          this.items[i].CATEGORY = this.items[i].CATEGORY + " " + this.items[i].SUBCATEGORY + " " + this.items[i].SUBCHILDCATEGORY;

          this.dataSource = new MatTableDataSource<ititems>(this.items)

        })
      }
      else {
        this.contractexist = false;
      }
     
    })
  }
  GetCategoryDropdown() {
    this.Componentservices.GetMaterialforstaOrprint("IT").subscribe(data => {
      console.log(data);
      this.listofdropdown = data
      this.Category = this.listofdropdown[0].Material;
    })
  }

  getvendor(data:string) {
    this.Componentservices.GetItVendorById(+data).subscribe(data => {
      this.itvendors = data
   
      this.vendorname = this.itvendors[0].VENDORNAME;
      this.vendoraddress = this.itvendors[0].ADDRESS;
    });
    }
  getSubCategories() {

    this.Componentservices.Getsubcategoryonchange("1").subscribe(data => {
      this.SubCategory = data;
      console.log(data);
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.PublishContractForm.invalid) {
      return;
    }
    this.loading = true;
    this.Componentservices
      .savereleaseorder(this.PublishContractForm.value)
      .subscribe(data => { this.datasubmit = data, this.loading = false; console.log(this.datasubmit); this.router.navigate(['IT/GetPublishContract']); },
        error => () => {

        },
        () => console.log(this.datasubmit)
      );


    
  }
  get f() { return this.PublishContractForm.controls; }

}
