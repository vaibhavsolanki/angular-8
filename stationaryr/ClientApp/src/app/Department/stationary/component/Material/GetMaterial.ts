import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { Material } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
    selector: 'getmaterial',
    templateUrl: './GetMaterial.html'
})

export class GetMaterial  {
   @Input() link1: string;
  routelink: string;
  editroutelink: string;
  getdata: string;
    message: string;
    Material: Material[];
   // MaterialPage: Material[];
    dataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    displayedColumns: string[] = ['ITEMS_DESCRIPTION','TYPE' ,'Edit/Delete'];
    constructor(private Componentservices: ComponentService, private router: Router) { }

  ngOnInit() {
   
    if (this.link1 == undefined) {
      this.routelink = "AddMaterial";
      this.editroutelink = "stationary/AddMaterial"

      this.getdata = "1";
    }
    else {
      this.routelink = this.link1;
      this.editroutelink = "IT/" + this.link1
      this.getdata = "2";
    }
        localStorage.removeItem('editmaterialId');
        this.Componentservices
          .GetMaterial(this.getdata).subscribe(
                data => {
                    this.Material = data, console.log(this.Material),
                        this.dataSource = new MatTableDataSource<Material>(this.Material),
                        this.dataSource.paginator = this.paginator
                })

    }
  editmaterial(Material: Material): void {

    localStorage.removeItem('editmaterialId');
    localStorage.setItem('editmaterialId', Material.ID.toString());
    this.router.navigate([this.editroutelink], {  queryParams: { id: Material.ID.toString() } });


    }
  deletematerial(Material: Material): void {
    if (confirm("Are you sure you want to delete this ?")) {
            this.Componentservices
                .deletematerial(Material.ID).subscribe(
                    data => {
                        this.message = data;

                    alert(this.message);
                   

                    this.Material = this.Material.filter(u => u !== Material)
                    this.dataSource = new MatTableDataSource<Material>(this.Material),
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
        this.Material = pageOfItems;
    }


}
