import { Routes } from '@angular/router';
import { MaterialComponent } from './component/Material/MaterialComponent';
import { GetMaterial } from './component/Material/GetMaterial';
import { GetUnits } from './component/Units/GetUnit';
import { UnitComponent } from './component/Units/UnitComponent';
import { GetSubCategory } from './component/subcategory/GetSubcategory';
import { SubCategoryComponent } from './component/subcategory/SubCategoryComponent';
import { GetSubChildCategory } from './component/subchildcategory/GetSubChildcategory';
import { SubChildCategoryComponent } from './component/subchildcategory/SubCategoryChildComponent';
import { StationaryRepositoryComponent } from './component/StationaryRepository/StationaryRepositoryComponent';
import { GetStationaryRepository } from './component/StationaryRepository/GetStationaryRepository';
import { PrintRepositoryComponent } from './component/Print/PrintRepository';
import { GetPrintRepository } from './component/Print/GetPrintRepository';
import { DGHuserRepositoryComponent } from './component/dghuser/dghuserRepository'
import { GetDghuserRepository } from './component/dghuser/GetdghuserRepository'
import { GetUsers } from './component/Users/GetUsers';
import { UsersComponent } from './component/Users/UsersComponent';
import { GetReport } from './component/Reports/GetReport';


import { StationaryHomeComponent } from './component/home/home.component';
import { GetCompany } from './component/COMPANY/GetCompany';
import { CompanyComponent } from './component/COMPANY/Company';
import { stationarydepart } from '../stationary/stationarydepart';
import { AuthGuard } from '../../services/auth.guard';
export const routes: Routes = [
  {
    path: '', component: stationarydepart, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: StationaryHomeComponent },
      
    
       { path: 'AddMaterial', component: MaterialComponent },
       { path: 'GetMaterial', component: GetMaterial },
      { path: 'AddCompany', component: CompanyComponent },
       { path: 'GetCompany', component: GetCompany },
       { path: 'GetUnits', component: GetUnits },
      { path: 'AddUnits', component: UnitComponent },
       { path: 'GetSubCategory', component: GetSubCategory },
       { path: 'AddSubCategory', component: SubCategoryComponent },
        { path: 'GetSubChildCategory', component: GetSubChildCategory },
       { path: 'AddSubChildCategory', component: SubChildCategoryComponent },
       { path: 'AddStationaryRepository', component: StationaryRepositoryComponent },
       { path: 'StationaryRepository', component: GetStationaryRepository },
       { path: 'AddUsers', component: UsersComponent},
       { path: 'GetUsers', component: GetUsers},


        { path: 'AddPrintRepository', component: PrintRepositoryComponent },
        { path: 'GetPrintRepository', component: GetPrintRepository },
        { path: 'DghuserRepository', component: DGHuserRepositoryComponent },
        { path: 'GetDghuserRepository', component: GetDghuserRepository },
        { path: 'GetReport', component: GetReport },



      //]


    ]
  }
];

