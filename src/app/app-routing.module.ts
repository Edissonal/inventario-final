import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './modulos/error/error.component';
import { LoginComponent } from './modulos/login/login/login.component';
import { AuthGuard } from './modulos/auth/auth.guard';
import { RegisloComponent } from './modulos/login/regislo/regislo.component';






const routes: Routes = [

 {
    path: 'auth', loadChildren: () => import('./modulos.module').then(m => m.ModulosModule),
  canLoad: [AuthGuard],
  canActivate:[AuthGuard]
  },
  {
    path: 'usu', loadChildren: () => import('./estandar/estandar/estandar.module').then(m => m.EstandarModule),
    canLoad: [AuthGuard],
    canActivate:[AuthGuard]
  },
  { path: 'logi', component: LoginComponent },
  { path: 'logire', component: RegisloComponent },
  { path:'**',redirectTo:'logi'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
