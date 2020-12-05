import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
//servicios
import { ProvedoresService } from "./servicios/provedores.service";

//modulos

import { ProvedorComponent } from './modulos/provedor/provedor.component';
import { ListasproveComponent } from './modulos/listasprove/listasprove.component';
import { ConproveComponent } from './modulos/conprove/conprove.component';
import { UpdateproComponent } from './modulos/updatepro/updatepro.component';


//rutas

import { AppRoutingModule } from '././app-routing.module';
import { UploadComponent } from './modulos/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    ProvedorComponent,
    ListasproveComponent,
    ConproveComponent,
    UpdateproComponent,
    UploadComponent


  ],
  imports: [
    BrowserModule,
     HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
    
  ],
  providers: [ProvedoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
