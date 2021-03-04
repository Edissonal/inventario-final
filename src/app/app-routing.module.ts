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
import { SnackbarComponent } from './modulos/snackbar/snackbar.component';
import { ConstmanComponent } from './modulos/mantenimientos/constman/constman.component';
import { CargamanComponent } from './modulos/cargas/cargaman/cargaman.component';
import { ConsulmanComponent } from './modulos/mantenimientos/consulman/consulman.component';
import { AddmanteComponent } from './modulos/mantenimientos/addmante/addmante.component';
import { ConsulmanfiComponent } from './modulos/mantenimientos/consulmanfi/consulmanfi.component';





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
  { path: 'snakbar', component: SnackbarComponent },
  { path: 'mante', component: ConstmanComponent },
  { path: 'carman', component: CargamanComponent },
  { path: 'cosman', component: ConsulmanComponent},
  { path: 'addman', component: AddmanteComponent},
  { path: 'addmanfi', component: ConsulmanfiComponent},
  { path:'**',pathMatch:'full',redirectTo:'addmanfi' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
