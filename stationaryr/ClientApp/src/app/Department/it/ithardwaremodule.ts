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
import {
  
  MatButtonModule,
  MatFormFieldModule, MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatTableModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule,
  MatPaginatorModule, MatSortModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, sharedModule,
    MatIconModule,
    MatDatepickerModule, MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule, MatSidenavModule, MatListModule,
        MatFormFieldModule, MatSelectModule, MatButtonModule, MatCardModule, MatPaginatorModule,
     
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [ItDevicename, ItGetDevicename, itcontractmaster,getitcontractmaster,ithardwaredepart, ItCategoryComponent, ItHomeComponent, NavITMenuComponent, GetItCategoryComponent
    , GetItSubCategoryComponent, ItSubCategoryComponent, GetItSubChildCategoryComponent, ItSubChildCategoryComponent,
    // , ContractMasterComponent
    
  ]

})
export class IthardwareModule { }

