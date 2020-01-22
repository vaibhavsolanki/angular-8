import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialComponent } from '../stationary/component/Material/MaterialComponent';
import { GetMaterial } from '../stationary/component/Material/GetMaterial';
import { GetSubCategory } from '../stationary/component/subcategory/GetSubcategory';
import { SubCategoryComponent } from '../stationary/component/subcategory/SubCategoryComponent';
import { GetSubChildCategory } from '../stationary/component/subchildcategory/GetSubChildcategory';
import { SubChildCategoryComponent } from '../stationary/component/subchildcategory/SubCategoryChildComponent';
import { GetRolemaster } from '../it/component/Rolemaster/getrolemaster';
import { Rolemaster } from '../it/component/Rolemaster/RoleMaster';
import { CommonModule } from '@angular/common';
import { GetUsers } from '../stationary/component/Users/GetUsers';
import { UsersComponent } from '../stationary/component/Users/UsersComponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {

    MatFormFieldModule, MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatTableModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule,
    MatPaginatorModule, MatSortModule, MatDatepickerModule, MatNativeDateModule,MatDialogModule
} from '@angular/material';
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
        MatIconModule,
       MatDatepickerModule, MatNativeDateModule,
      
        MatTableModule,
        MatInputModule, 
        MatToolbarModule, MatSidenavModule, MatListModule,
        MatFormFieldModule, MatSelectModule, MatCardModule, MatPaginatorModule, MatSortModule,MatDialogModule],
  declarations: [MaterialComponent, GetMaterial, GetSubCategory, SubCategoryComponent, SubChildCategoryComponent, GetSubChildCategory,GetRolemaster,Rolemaster,GetUsers,UsersComponent],
  exports: [MaterialComponent, GetMaterial, GetSubCategory, SubCategoryComponent, SubChildCategoryComponent, GetSubChildCategory,GetRolemaster,Rolemaster,GetUsers,UsersComponent]
})
export class sharedModule { }
