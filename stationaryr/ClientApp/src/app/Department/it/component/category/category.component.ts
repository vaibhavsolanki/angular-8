import { Component, OnInit, ViewChild } from '@angular/core';

//import { dynamicdata } from '../../../../TableEntity/TableEntityClass';
@Component({
    selector: 'app-itcategory',
    templateUrl: './category.component.html',
})
export class ItCategoryComponent implements OnInit {
  link: string;


  ngOnInit() {
    this.link = "GetCategory";
  }
  
  }
    // config: any;
    //   rows = [];




