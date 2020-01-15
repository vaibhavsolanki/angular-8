import { Component, OnInit,ViewChild, Input } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { SubCategory } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
    selector: 'getsubcategory',
    templateUrl: './GetSubcategory.html'
})

export class GetSubCategory {
  @Input() link1: string;
  routelink: string;
  editroutelink: string;
  getdata: string;
    message: string;
    SubCategory: SubCategory[];
    SubCategorys: SubCategory[];
    dataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    displayedColumns: string[] = ['DESCRIPTION','PARENT_ID', 'Edit/Delete'];
    constructor(private Componentservices: ComponentService, private router: Router) { }

  ngOnInit() {
    if (this.link1 == undefined) {
      this.routelink = "AddSubCategory";
      this.editroutelink = "stationary/AddSubCategory"

      this.getdata = "1";
    }
    else {
      this.routelink = this.link1;
      this.editroutelink = "IT/" + this.link1
      this.getdata = "2";
    }
        localStorage.removeItem('editsubcategoryId');
        this.Componentservices
          .GetSubcategory("SubCategory", this.getdata).subscribe(
                data => {
                    this.SubCategorys = data, console.log(this.SubCategorys),
                        this.dataSource = new MatTableDataSource<SubCategory>(this.SubCategorys),
                        this.dataSource.paginator = this.paginator
                })

    }
    editSubCategory(SubCategory: SubCategory): void {
        localStorage.removeItem('editsubcategoryId');
        localStorage.setItem('editsubcategoryId', SubCategory.ID.toString());
      this.router.navigate([this.editroutelink ], { queryParams: { id: SubCategory.ID.toString() } } );
      

    }
    deleteSubCategory(SubCategory: SubCategory): void {
        if (confirm("Are you sure you want to delete this ?")) {
            this.Componentservices
                .deleteSubcategory(SubCategory.ID).subscribe(
                    data => {
                        this.message = data,
                          
                            this.SubCategorys = this.SubCategorys.filter(u => u !== SubCategory)
                        this.dataSource = new MatTableDataSource<SubCategory>(this.SubCategorys),
                            this.dataSource.paginator = this.paginator
                    }
                )
        }
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.SubCategory = pageOfItems;
    }


}
