import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ithardwaredepart } from '../it/ithardware';
import { ItHomeComponent } from './component/home/home';
import { NavITMenuComponent } from './component/navbar/nav.component';
import { GetItCategoryComponent } from './component/category/getcategory.component';
import { ItCategoryComponent } from './component/category/category.component';
import { routes } from './ithardwarerouting';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { sharedModule } from '../shared/shared.module';
import { GetItSubCategoryComponent } from './component/subcategory/getsubcategory.component';
import { ItSubCategoryComponent } from './component/subcategory/subcategory.component';
import { GetItSubChildCategoryComponent } from './component/subchildcategory/getsubchildcategory.component';
import { ItSubChildCategoryComponent } from './component/subchildcategory/subchildcategory.component';
//import { ContractMasterComponent } from './component/contractmaster/contractmaster';
import { itcontractmaster } from './component/contractmasterit/contractmasterit';
import { ItDevicename } from './component/devicename/devicename';
import { ItGetDevicename } from './component/devicename/getdevicename';
import { getitcontractmaster } from './component/contractmasterit/getcontractmasterit';
import { getuserit } from './component/User/getuser';
import { userit } from './component/User/user';
import { getpublishcontract } from './component/publishcontract/getpublishcontract';

import { publishcontract } from './component/publishcontract/publishcontract';
import { itvendors } from './component/vendor/vendor';
import { getitvendor } from './component/vendor/getvendor';

import { getitemreceipt } from './component/receiptofitems/getitemreceipt';
import { itemreceipts } from './component/receiptofitems/itemreceipt';

import { issueditems } from './component/issueitems/issueitems';
import { getissueditems } from './component/issueitems/getissueitems';
import { getrequestitem } from './component/requestitems/getrequestitem';
import { requestitem } from './component/requestitems/requestitem';
import { InventoryPosition } from './component/report/inventoryposition'
import { IssueDetails } from './component/report/issuedetails'
import { OrderDetails } from './component/report/orderdetails'
//import { ReceiptDetails } from './component/report/receiptdetail'
//import { Return_By_User } from './component/report/return_of_item_by_user'
import {
  
  MatButtonModule,
  MatFormFieldModule, MatSelectModule, 
  MatInputModule, MatTabsModule, MatExpansionModule,
  MatCardModule, MatMenuModule,
  MatTableModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule,
  MatPaginatorModule, MatSortModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatBadgeModule,
} from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NavService } from './component/menu-list-item/nav.service'
import { MenuListItemComponent } from './component/menu-list-item/menu-list-item.component'
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, sharedModule,
    MatIconModule, MatTabsModule, MatExpansionModule, MatSlideToggleModule,
    MatDatepickerModule, MatNativeDateModule,
    NgxMaterialTimepickerModule, MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule, MatSidenavModule, MatListModule, MatBadgeModule,
        MatFormFieldModule, MatSelectModule, MatButtonModule, MatCardModule, MatPaginatorModule,
     
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [ItDevicename, ItGetDevicename, itcontractmaster,getitcontractmaster,ithardwaredepart, ItCategoryComponent, ItHomeComponent, NavITMenuComponent, GetItCategoryComponent
    , GetItSubCategoryComponent, ItSubCategoryComponent, GetItSubChildCategoryComponent, ItSubChildCategoryComponent,
    getuserit, userit, getpublishcontract, publishcontract, itvendors, getitvendor, getitemreceipt, itemreceipts,
    requestitem, getrequestitem, 
    issueditems, getissueditems, MenuListItemComponent,
    InventoryPosition
    , OrderDetails,
    //ReceiptDetails, Return_By_User,
    IssueDetails
    //,
  ],
   providers: [NavService]
})
export class IthardwareModule { }

