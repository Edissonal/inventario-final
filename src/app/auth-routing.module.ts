import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';

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
import { EditmanComponent } from './modulos/mantenimientos/editman/editman.component';
import { PruComponent } from './modulos/mantenimientos/pru/pru.component';
import { LoginComponent } from './modulos/login/login/login.component';
import { ErrorComponent } from './modulos/error/error.component';
import { ConslogiComponent } from './modulos/login/conslogi/conslogi.component';
import { EditlogiComponent } from './modulos/login/editlogi/editlogi.component';
import { AdminComponent } from './modulos/login/admin/admin.component';
import { EstandarComponent } from './modulos/login/estandar/estandar.component';
import { AddmarcaComponent } from './modulos/marca/addmarca/addmarca.component';
import { ConsmarcaComponent } from './modulos/marca/consmarca/consmarca.component';
import { EditmarcaComponent } from './modulos/marca/editmarca/editmarca.component';
import { AddubicacionComponent } from './modulos/ubicacion/addubicacion/addubicacion.component';
import { ConsubicacionComponent } from './modulos/ubicacion/consubicacion/consubicacion.component';
import { EditubicacionComponent } from './modulos/ubicacion/editubicacion/editubicacion.component';
import { CargamarcaComponent } from './modulos/cargas/cargamarca/cargamarca.component';
import { CargaequipoComponent } from './modulos/cargas/cargaequipo/cargaequipo.component';
import { CargaubicacionComponent } from './modulos/cargas/cargaubicacion/cargaubicacion.component';
import { ConssedeComponent } from './modulos/sede/conssede/conssede.component';
import { AddsedeComponent } from './modulos/sede/addsede/addsede.component';
import { EditsedeComponent } from './modulos/sede/editsede/editsede.component';
import { ConshisconComponent } from './modulos/hisconsultas/conshiscon/conshiscon.component';
import { ConshismanComponent } from './modulos/hismantenimiento/conshisman/conshisman.component';
import { MenunavbarComponent } from './modulos/navbar/menunavbar/menunavbar.component';
import { MenuadminComponent } from './modulos/login/menuadmin/menuadmin.component';
import { RegisloComponent } from './modulos/login/regislo/regislo.component';


const routes: Routes =[

  {
    path: '',
    component:AdminComponent,
    children: [
      
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
  { path: 'addmanfi', component: ConsulmanfiComponent },
  { path: 'ediman/:id', component: EditmanComponent },
  { path: 'pru', component: PruComponent},
  { path: 'error', component: ErrorComponent},
  { path: 'login', component: LoginComponent },
  { path: 'constlogi', component: ConslogiComponent },
  { path: 'editLogi/:id', component: EditlogiComponent},
  { path: 'user', component: EstandarComponent },
  { path: 'adicionarma', component: AddmarcaComponent },
  { path: 'consultarma', component: ConsmarcaComponent },
  { path: 'editarmar/:id', component: EditmarcaComponent },
  { path: 'adicionarubi', component: AddubicacionComponent },
  { path: 'consultarubi', component: ConsubicacionComponent },
  { path: 'editarubi/:id', component: EditubicacionComponent },
  { path: 'uploadmarca', component: CargamarcaComponent },
  { path: 'uploadequipo', component: CargaequipoComponent },
  { path: 'uploadubicacion', component: CargaubicacionComponent },
  { path: 'adicionarsede', component: AddsedeComponent },
  { path: 'editarsede/:id', component: EditsedeComponent },
  { path: 'conssede', component: ConssedeComponent },
  { path: 'hisconsultas', component: ConshisconComponent },
  { path: 'hismantenimiento', component: ConshismanComponent },
  { path: 'logire', component: RegisloComponent },
  { path:'**',redirectTo:'consultas'},
]
}

]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ], exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
