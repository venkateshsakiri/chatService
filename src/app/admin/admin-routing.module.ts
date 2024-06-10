import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PostCouponsComponent } from './components/post-coupons/post-coupons.component';
import { CouponsListComponent } from './components/coupons-list/coupons-list.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'category', component: PostCategoryComponent },
  { path: 'product', component: PostProductComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'post-coupon', component: PostCouponsComponent },
  { path: 'coupon', component: CouponsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
