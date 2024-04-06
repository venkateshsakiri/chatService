import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatModule } from './../../projects/chat/src/app/app.module';
import { AuthGuardGuard } from './service/guard/auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'customer',
    canActivate:[AuthGuardGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule)
  },
  {
    path: 'admin',
    canActivate:[AuthGuardGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path:'chat',
    canActivate:[AuthGuardGuard],
    runGuardsAndResolvers: 'always',
    loadChildren:() => import('./../../projects/chat/src/app/app.module').then((m)=>m.ChatModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, preloadingStrategy:PreloadAllModules}),ChatModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule {}
