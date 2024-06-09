import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import { SharedModule } from '../shared.module';
import { PostProductComponent } from './components/post-product/post-product.component';
import {MatSelectModule} from '@angular/material/select';
import { OrdersComponent } from './components/orders/orders.component';
import { PostCouponsComponent } from './components/post-coupons/post-coupons.component';
import { CouponsListComponent } from './components/coupons-list/coupons-list.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    PostCategoryComponent,
    PostProductComponent,
    OrdersComponent,
    PostCouponsComponent,
    CouponsListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatGridListModule,
    MatSelectModule
  ]
})
export class AdminModule { }
