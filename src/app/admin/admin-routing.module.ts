import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'category', component: PostCategoryComponent },
  { path: 'product', component: PostProductComponent },
  { path: 'orders', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
