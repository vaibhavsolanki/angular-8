import { Component, OnInit, ViewChild } from '@angular/core';

//import { dynamicdata } from '../../../../TableEntity/TableEntityClass';
@Component({
  selector: 'app-itsubchildcategory',
  templateUrl: './subchildcategory.component.html',
})
export class ItSubChildCategoryComponent implements OnInit {

  link: string;
  ngOnInit() {
    this.link = "GetSubChildCategory";
  }
}
    // config: any;
    //   rows = [];




