import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCurrencyFormatModule } from 'mat-currency-format';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../../auth-routing.module';

import { EstandarRoutingModule } from './estandar-routing.module';
import { Consultas2Component } from 'src/app/modulos/consultas/consultas2/consultas2.component';
import { Equipos2Component } from 'src/app/modulos/equipos/equipos2/equipos2.component';
import { Consmante2Component } from 'src/app/modulos/mantenimientos/consmante2/consmante2.component';
import { Provedores2Component } from 'src/app/modulos/provedores/provedores2/provedores2.component';
import { ConsmarcausuComponent } from 'src/app/modulos/marca/consmarcausu/consmarcausu.component';


@NgModule({
  declarations: [
    Consultas2Component,
    Equipos2Component,
    Consmante2Component,
    Provedores2Component,
    ConsmarcausuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    EstandarRoutingModule,
    FormsModule,
    NgbModule,
    RouterModule,
    MatCurrencyFormatModule
    
  ], exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgbModule
  ]
})
export class EstandarModule { }
