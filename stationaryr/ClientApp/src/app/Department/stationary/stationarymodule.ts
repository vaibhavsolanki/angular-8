import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


//import { MaterialComponent } from './component/Material/MaterialComponent';
//import { GetMaterial } from './component/Material/GetMaterial';
import { GetUnits } from './component/Units/GetUnit';
import { UnitComponent } from './component/Units/UnitComponent';
//import { GetSubCategory } from './component/subcategory/GetSubcategory';
//import { SubCategoryComponent } from './component/subcategory/SubCategoryComponent';
//import { GetSubChildCategory } from './component/subchildcategory/GetSubChildcategory';
//import { SubChildCategoryComponent } from './component/subchildcategory/SubCategoryChildComponent';
import { StationaryRepositoryComponent } from './component/StationaryRepository/StationaryRepositoryComponent';
import { GetStationaryRepository } from './component/StationaryRepository/GetStationaryRepository';
import { PrintRepositoryComponent } from './component/Print/PrintRepository';
import { GetPrintRepository } from './component/Print/GetPrintRepository';
import { DGHuserRepositoryComponent } from './component/dghuser/dghuserRepository'
import { GetDghuserRepository } from './component/dghuser/GetdghuserRepository'
import { GetUsers } from './component/Users/GetUsers';
import { UsersComponent } from './component/Users/UsersComponent';
import { GetReport } from './component/Reports/GetReport';

import { NavMenuComponent } from './component/nav-menu/nav-menu.component';
import { StationaryHomeComponent } from './component/home/home.component';
import { GetCompany } from './component/COMPANY/GetCompany';
import { CompanyComponent } from './component/COMPANY/Company';
import { stationarydepart } from '../stationary/stationarydepart';
import { CommonModule } from '@angular/common';
import { routes } from './stationaryrouting';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { sharedModule } from '../shared/shared.module';
import {
  MatButtonModule,
  MatFormFieldModule, MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatTableModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule,
  MatPaginatorModule, MatSortModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
@NgModule({
    imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule, sharedModule,
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
  declarations: [stationarydepart,
  
    GetUsers, UsersComponent,
    NavMenuComponent,
    StationaryHomeComponent,
    GetCompany, CompanyComponent,
    UnitComponent
    , GetUnits,// GetSubCategory, SubCategoryComponent,
   // GetSubChildCategory, SubChildCategoryComponent,
    StationaryRepositoryComponent
    , GetStationaryRepository, PrintRepositoryComponent, GetPrintRepository,
    DGHuserRepositoryComponent, GetDghuserRepository, GetReport
  ]
})
export class StationaryModule { }
