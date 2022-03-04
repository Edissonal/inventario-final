import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditlogiComponent } from '../modulos/login/editlogi/editlogi.component';
import { LoginComponent } from '../modulos/login/login/login.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: 'edita/:id', component: EditlogiComponent },
      { path: 'login', component: LoginComponent },
      { path:'**',redirectTo:'login'} 
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestableceRoutingModule { }
