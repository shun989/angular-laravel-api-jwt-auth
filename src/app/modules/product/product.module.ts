import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { ProductAddComponent } from '../../components/product/product-add/product-add.component';
import { ProductEditComponent } from '../../components/product/product-edit/product-edit.component';
import { ProductDetailComponent } from '../../components/product/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'add',
    component: ProductAddComponent
  },
  {
    path: ':id/detail',
    component: ProductDetailComponent
  },
  {
    path: ':id/edit',
    component: ProductEditComponent
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
