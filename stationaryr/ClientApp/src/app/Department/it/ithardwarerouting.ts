import { AuthGuard } from '../../services/auth.guard';
import { Routes } from '@angular/router';
import { ithardwaredepart } from '../it/ithardware';
import { ItHomeComponent } from './component/home/home';
import { GetItCategoryComponent } from './component/category/getcategory.component';
import { ItCategoryComponent } from './component/category/category.component';
import { GetItSubCategoryComponent } from './component/subcategory/getsubcategory.component';
import { ItSubCategoryComponent } from './component/subcategory/subcategory.component';
import { GetItSubChildCategoryComponent } from './component/subchildcategory/getsubchildcategory.component';
import { ItSubChildCategoryComponent } from './component/subchildcategory/subchildcategory.component';
//import { ContractMasterComponent } from './component/contractmaster/contractmaster';
//import { GetContractMasterComponent1 } from './component/contractmaster/getcontractmaster';
import { getitcontractmaster } from './component/contractmasterit/getcontractmasterit';
import { itcontractmaster } from './component/contractmasterit/contractmasterit';
import { ItDevicename } from './component/devicename/devicename';
import { ItGetDevicename } from './component/devicename/getdevicename';

import { GetRolemaster } from './component/Rolemaster/getrolemaster';
import { Rolemaster } from './component/Rolemaster/RoleMaster';
import { getuserit } from './component/User/getuser';
import { userit } from './component/User/user';
import { getpublishcontract } from './component/publishcontract/getpublishcontract';
import { itvendors } from './component/vendor/vendor';
import { getitvendor } from './component/vendor/getvendor';
import { getitemreceipt } from './component/receiptofitems/getitemreceipt';
import { itemreceipts } from './component/receiptofitems/itemreceipt';
import { publishcontract } from './component/publishcontract/publishcontract';
import { issueditems } from './component/issueitems/issueitems';
import { getissueditems } from './component/issueitems/getissueitems';
import { getrequestitem } from './component/requestitems/getrequestitem';
import { requestitem } from './component/requestitems/requestitem';
import { InventoryPosition } from './component/report/inventoryposition'
import { IssueDetails } from './component/report/issuedetails'
import { OrderDetails } from './component/report/orderdetails'
import { ReceiptDetails } from './component/report/receiptdetail'
import { Return_By_User } from './component/report/return_of_item_by_user'
export const routes: Routes = [
  {
    path: '', component: ithardwaredepart, canActivate: [AuthGuard]
    , children:[
      {
        path: 'home', component: ItHomeComponent 
        },

      { path: 'GetContractMaster', component: getitcontractmaster },
      { path: 'ContractMaster', component: itcontractmaster },
      { path: 'GetCategory', data: { link: 'Category' }, component: GetItCategoryComponent },
      { path: 'Category', component: ItCategoryComponent },
      { path: 'GetSubCategory', data: { link: 'SubCategory' }, component: GetItSubCategoryComponent },
      { path: 'SubCategory', component: ItSubCategoryComponent },
      { path: 'GetSubChildCategory', data: { link: 'SubChildCategory' }, component: GetItSubChildCategoryComponent },
      { path: 'SubChildCategory', component: ItSubChildCategoryComponent },
      { path: 'GetDevice', component: ItGetDevicename },
      { path: 'AddDevice', component: ItDevicename },
 { path: 'GetRolemaster', component: GetRolemaster },
{ path: 'Rolemaster', component: Rolemaster },
 { path: 'GetUsers', component: getuserit },
      { path: 'AddUsers', component: userit },
      { path: 'GetPublishContract', component: getpublishcontract },
      { path: 'PublishContract', component: publishcontract },
      { path: 'Vendor', component: itvendors },
      { path: 'GetVendor', component: getitvendor },
      { path: 'GetItemReceipt', component: getitemreceipt },
      { path: 'ItemReceipt', component: itemreceipts },

      { path: 'IssueItems', component: issueditems },
      { path: 'GetIssueItems', component: getissueditems },
      { path: 'RequestItems', component: requestitem },
      { path: 'GetRequestItems', component: getrequestitem },

      { path: 'InventoryPosition', component: InventoryPosition },

      { path: 'OrderDetails', component: OrderDetails },
      { path: 'ReceiptDetails', component: ReceiptDetails },
      { path: 'Return_By_User', component: Return_By_User },
      { path: 'IssueDetails', component: IssueDetails },

      
    
      //{ path: 'ContractMaster', component: ContractMasterComponent },

    ]
    
  }
];
