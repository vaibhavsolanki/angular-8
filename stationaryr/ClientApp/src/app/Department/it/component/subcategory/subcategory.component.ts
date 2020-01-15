import { Component, OnInit, ViewChild } from '@angular/core';

//import { dynamicdata } from '../../../../TableEntity/TableEntityClass';
@Component({
  selector: 'app-itsubcategory',
  templateUrl: './subcategory.component.html',
})
export class ItSubCategoryComponent implements OnInit {
  link: string;
  ngOnInit() {
    this.link = "GetSubCategory";
  }
}
    // config: any;
    //   rows = [];




