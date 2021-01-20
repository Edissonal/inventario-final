import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddprovedorComponent } from './modulos/provedores/addprovedor/addprovedor.component';
import { ConsprovedorComponent } from './modulos/provedores/consprovedor/consprovedor.component';
import { EditprovedorComponent } from './modulos/provedores/editprovedor/editprovedor.component';
import { ConsequipoComponent } from './modulos/equipos/consequipo/consequipo.component';
import { AddequipoComponent } from './modulos/equipos/addequipo/addequipo.component';
import { EdiequiComponent } from './modulos/equipos/ediequi/ediequi.component';
import { ConstComponent } from './modulos/consultas/const/const.component';
import { AddconsComponent } from './modulos/consultas/addcons/addcons.component';
import { EditconComponent } from './modulos/consultas/editcon/editcon.component';
import { CargaconsultComponent } from './modulos/cargas/cargaconsult/cargaconsult.component';





const routes: Routes = [

  { path: 'adicionarpro', component: AddprovedorComponent },
  { path: 'consprovedor', component: ConsprovedorComponent },
  { path: 'editarpro/:id', component: EditprovedorComponent },
  { path: 'consequi', component: ConsequipoComponent },
  { path: 'adicionarequi', component: AddequipoComponent },
  { path: 'editarequi/:id', component: EdiequiComponent },
  { path: 'consultas', component: ConstComponent },
  { path: 'addcons', component: AddconsComponent },
  { path: 'editcon/:id', component: EditconComponent },
  { path: 'cargaconsul', component: CargaconsultComponent },
  { path:'**',pathMatch:'full',redirectTo:'cargaconsul' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
