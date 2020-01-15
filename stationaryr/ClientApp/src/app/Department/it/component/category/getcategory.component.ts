import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-getitcategory',
    templateUrl: './getcategory.component.html',
})
export class GetItCategoryComponent implements OnInit {

  dynamicdata: any;
  link: string;
  constructor(private activatedroute: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.link = 'Category';
    this.activatedroute.data.subscribe(data => {
      this.dynamicdata = data;
      console.log(this.dynamicdata);
    })
    // config: any;
    //   rows = [];

  }

}
