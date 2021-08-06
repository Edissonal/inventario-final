import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//Modulos

import { AddprovedorComponent } from './modulos/provedores/addprovedor/addprovedor.component';
import { ConsprovedorComponent } from './modulos/provedores/consprovedor/consprovedor.component';
import { EditprovedorComponent } from './modulos/provedores/editprovedor/editprovedor.component';
import { ConsequipoComponent } from './modulos/equipos/consequipo/consequipo.component';
import { AddequipoComponent } from './modulos/equipos/addequipo/addequipo.component';
import { EdiequiComponent } from './modulos/equipos/ediequi/ediequi.component';
import { ConstComponent } from './modulos/consultas/const/const.component';
import { AddconsComponent } from './modulos/consultas/addcons/addcons.component';
import { AddcFinalComponent } from './modulos/consultas/addc-final/addc-final.component';
import { EditconComponent } from './modulos/consultas/editcon/editcon.component';
import { CargaconsultComponent } from './modulos/cargas/cargaconsult/cargaconsult.component';
import { BarraComponent } from './modulos/barra/barra.component';
import { SnackbarComponent } from './modulos/snackbar/snackbar.component';
import { ConstmanComponent } from './modulos/mantenimientos/constman/constman.component';
import { CargamanComponent } from './modulos/cargas/cargaman/cargaman.component';
import { ConsulmanComponent } from './modulos/mantenimientos/consulman/consulman.component';
import { AddmanteComponent } from './modulos/mantenimientos/addmante/addmante.component';
import { ConsulmanfiComponent } from './modulos/mantenimientos/consulmanfi/consulmanfi.component';
import { EditmanComponent } from './modulos/mantenimientos/editman/editman.component';
import { PruComponent } from './modulos/mantenimientos/pru/pru.component';
import { MesesPipe } from './modulos/pipes/meses.pipe';
import { estadosPipe } from './modulos/pipes/estados.pipe';
import { LoginComponent } from './modulos/login/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ErrorComponent } from './modulos/error/error.component';
import { ConslogiComponent } from './modulos/login/conslogi/conslogi.component';
import { EditlogiComponent } from './modulos/login/editlogi/editlogi.component';
import { RegisloComponent } from './modulos/login/regislo/regislo.component';
import { EstandarComponent } from './modulos/login/estandar/estandar.component';
import { AdminComponent } from './modulos/login/admin/admin.component';
import { MatCurrencyFormatModule } from 'mat-currency-format';
import { NumberPipe } from './modulos/pipes/numeros.pipe';
import { NumerosDirective } from './modulos/directive/numeros.directive';
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




@NgModule({
  declarations: [
    AddprovedorComponent,
    ConsprovedorComponent,
    EditprovedorComponent,
    ConsequipoComponent,
    AddequipoComponent,
    EdiequiComponent,
    ConstComponent,
    AddconsComponent,
    AddcFinalComponent,
    EditconComponent,
    CargaconsultComponent,
    BarraComponent,
    SnackbarComponent,
    ConstmanComponent,
    CargamanComponent,
    ConsulmanComponent,
    AddmanteComponent,
    ConsulmanfiComponent,
    EditmanComponent,
    PruComponent,
    MesesPipe,
    estadosPipe,
    LoginComponent,
    ErrorComponent,
    ConslogiComponent,
    EditlogiComponent,
    RegisloComponent,
    EstandarComponent,
    AdminComponent,
    NumberPipe,
    NumerosDirective,
    AddmarcaComponent,
    ConsmarcaComponent,
    EditmarcaComponent,
    AddubicacionComponent,
    ConsubicacionComponent,
    EditubicacionComponent,
    CargamarcaComponent,
    CargaequipoComponent,
    CargaubicacionComponent,
    ConssedeComponent,
    AddsedeComponent,
    EditsedeComponent,
    ConshisconComponent,
    ConshismanComponent,
    MenunavbarComponent,
    MenuadminComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    FormsModule,
    NgbModule,
    MatCurrencyFormatModule

  ], exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgbModule
  ]
})
export class ModulosModule { }
