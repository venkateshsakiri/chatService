import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartListComponent } from './components/cart-list/cart-list.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'dashboard', component: CustomerDashboardComponent },
  {path:'product-details/:categoryName',component:ProductDetailsComponent},
  {path:'cart',component:CartListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
