import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../../../../services/ComponentService';
import { contract } from '../../../../TableEntity/TableEntityClass';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'app-itgetcontactmaster',
  templateUrl: './getcontractmasterit.html',
})

export class getitcontractmaster {

  message: string;
  Contract: contract[];
  Contracts: contract[];

  dataSource;
  displayedColumns: string[] = ['CONTRACTNO','VENDORNAME','STARTDATE','ENDDATE', 'Edit/Delete'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private Componentservices: ComponentService, private router: Router) { }

  ngOnInit() {
    
    localStorage.removeItem('editContractId');
    this.Componentservices
      .GetContractform().subscribe(
        data => {
          this.Contracts = data, console.log(this.Contracts),
            this.dataSource = new MatTableDataSource<contract>(this.Contracts),
          this.dataSource.paginator = this.paginator
        })

  }

  editContract(contract: contract): void {
    localStorage.removeItem('editContractId');
    localStorage.setItem('editContractId', contract.CONTRACTID.toString());
    this.router.navigate(['IT/ContractMaster'], { queryParams: { id: contract.CONTRACTID.toString() } });


  }
  deleteContract(contract: contract): void {
    if (confirm("Are you sure you want to delete this ?")) {
      this.Componentservices
        .deleteContractform(contract.CONTRACTID).subscribe(
          data => {
            this.message = data,

              this.Contracts = this.Contracts.filter(u => u !== contract)
            this.dataSource = new MatTableDataSource<contract>(this.Contracts),
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
    this.Contracts = pageOfItems;
  }



}
