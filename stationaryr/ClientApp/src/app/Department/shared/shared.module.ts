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
import { GroupByPipe } from '../../Directive/group-by.pipe'
import {

    MatFormFieldModule, MatSelectModule,
  MatInputModule,
  MatCardModule, MatButtonModule,
  MatTableModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatTabsModule, MatExpansionModule,
  MatPaginatorModule, MatSortModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatSlideToggleModule,
} from '@angular/material';
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
    MatIconModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule,


    MatTableModule, 
    MatInputModule, MatTabsModule, MatExpansionModule,
        MatToolbarModule, MatSidenavModule, MatListModule,
        MatFormFieldModule, MatSelectModule, MatCardModule, MatPaginatorModule, MatSortModule,MatDialogModule],
  declarations: [GroupByPipe,MaterialComponent, GetMaterial, GetSubCategory, SubCategoryComponent, SubChildCategoryComponent, GetSubChildCategory,GetRolemaster,Rolemaster,GetUsers,UsersComponent],
  exports: [GroupByPipe,MaterialComponent, GetMaterial, GetSubCategory, SubCategoryComponent, SubChildCategoryComponent, GetSubChildCategory,GetRolemaster,Rolemaster,GetUsers,UsersComponent]
})
export class sharedModule { }
