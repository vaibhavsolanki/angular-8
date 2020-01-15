import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-getitsubchildcategory',
  templateUrl: './getsubchildcategory.component.html',
})
export class GetItSubChildCategoryComponent implements OnInit {

  dynamicdata: any;
  link: string;
  constructor(private activatedroute: ActivatedRoute) {

  }

  ngOnInit() {
    this.link = 'SubChildCategory';



  }

}
