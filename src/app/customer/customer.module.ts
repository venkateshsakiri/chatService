import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { SharedModule } from '../shared.module';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WhishListComponent } from './components/whish-list/whish-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ReviewPopupComponent } from './components/review-popup/review-popup.component';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerDashboardComponent,
    ProductDetailsComponent,
    CartListComponent,
    OrdersComponent,
    WhishListComponent,
    OrderDetailsComponent,
    ReviewPopupComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
