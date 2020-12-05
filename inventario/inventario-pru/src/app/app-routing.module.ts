import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConproveComponent } from './modulos/conprove/conprove.component';
import { ProvedorComponent } from './modulos/provedor/provedor.component';
import { UpdateproComponent } from './modulos/updatepro/updatepro.component';
import { UploadComponent } from './modulos/upload/upload.component';


const routes: Routes = [
  { path: 'consulta', component: ConproveComponent },
  { path: 'adicionar', component: ProvedorComponent },
  { path: 'editar/:id', component: UpdateproComponent },
  { path: 'upload', component:  UploadComponent },
  { path:'**',pathMatch:'full',redirectTo:'upload' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
