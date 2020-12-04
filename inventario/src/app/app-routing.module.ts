import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddprovedorComponent } from './modulos/provedores/addprovedor/addprovedor.component';
import { ConsprovedorComponent } from './modulos/provedores/consprovedor/consprovedor.component';
import { EditprovedorComponent } from './modulos/provedores/editprovedor/editprovedor.component';
import { ConsequipoComponent } from './modulos/equipos/consequipo/consequipo.component';
import { AddequipoComponent } from './modulos/equipos/addequipo/addequipo.component';
import { EdiequiComponent } from './modulos/equipos/ediequi/ediequi.component';



const routes: Routes = [

  { path: 'adicionarpro', component: AddprovedorComponent },
  { path: 'consprovedor', component: ConsprovedorComponent },
  { path: 'editarpro/:id', component: EditprovedorComponent },
  { path: 'consequi', component: ConsequipoComponent },
  { path: 'adicionarequi', component: AddequipoComponent },
  { path: 'editarequi/:id', component: EdiequiComponent },
  { path:'**',pathMatch:'full',redirectTo:'consequi' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
