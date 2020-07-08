import { Component, OnInit, ViewChild } from '@angular/core'
import { Material, SubCategory, ititems, itissueitems, listofdropdown, AdminIssue } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort, MatAccordion } from '@angular/material';
import { ComponentService } from '../../../../services/ComponentService';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-inventoryposition',
  templateUrl: './inventoryposition.html',
  styles:['./report.css']
})
export class InventoryPosition implements OnInit {
  Category: Material[];
  SubCategory: SubCategory[] = [];
  listofdropdown: listofdropdown[];
  @ViewChild('accordion', { static: true }) Accordion: MatAccordion

  constructor(private Componentservices: ComponentService, private router: Router) {


  }

  ngOnInit() {
    this.GetCategoryDropdown();
   
  }
  beforePanelOpened(category) {
    this.getSubCategories(category.ID) 
    console.log(category);
  }
  GetCategoryDropdown() {
    this.Componentservices.GetCategoryPostion("IT").subscribe(data => {
      this.Category = data; console.log("e"); 

      
      console.log(this.Category);
    })
  }
  getSubCategories(category:string) {

    this.Componentservices.GetSubCategoryPostion("1",category).subscribe(data => {
      this.SubCategory = data;
      console.log(this.SubCategory);
    });


  }
}
