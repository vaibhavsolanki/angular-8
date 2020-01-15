import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialComponent } from '../stationary/component/Material/MaterialComponent';
import { GetMaterial } from '../stationary/component/Material/GetMaterial';
import { GetSubCategory } from '../stationary/component/subcategory/GetSubcategory';
import { SubCategoryComponent } from '../stationary/component/subcategory/SubCategoryComponent';
import { GetSubChildCategory } from '../stationary/component/subchildcategory/GetSubChildcategory';
import { SubChildCategoryComponent } from '../stationary/component/subchildcategory/SubCategoryChildComponent';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {

    MatFormFieldModule, MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatTableModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule,
    MatPaginatorModule, MatSortModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
        MatIconModule,
       MatDatepickerModule, MatNativeDateModule,
      
        MatTableModule,
        MatInputModule, 
        MatToolbarModule, MatSidenavModule, MatListModule,
        MatFormFieldModule, MatSelectModule, MatCardModule, MatPaginatorModule, MatSortModule,],
  declarations: [MaterialComponent, GetMaterial, GetSubCategory, SubCategoryComponent, SubChildCategoryComponent, GetSubChildCategory],
  exports: [MaterialComponent, GetMaterial, GetSubCategory, SubCategoryComponent, SubChildCategoryComponent, GetSubChildCategory]
})
export class sharedModule { }
