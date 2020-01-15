import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-getitsubcategory',
  templateUrl: './getsubcategory.component.html',
})
export class GetItSubCategoryComponent implements OnInit {

  dynamicdata: any;
  link: string;
  constructor(private activatedroute: ActivatedRoute) {

  }

  ngOnInit() {
    this.link = 'SubCategory';
    
    

  }

}
