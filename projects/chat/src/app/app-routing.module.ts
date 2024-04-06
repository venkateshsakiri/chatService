import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardGuard } from 'src/app/service/guard/auth-guard.guard';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'',
    canActivate:[AuthGuardGuard],
    children:[
      {path:'chat',component:UsersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
