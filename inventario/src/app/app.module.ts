import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//modulos
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




@NgModule({
  declarations: [
    AppComponent,
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
    ConstmanComponent
,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
