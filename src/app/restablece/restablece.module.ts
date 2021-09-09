import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestableceRoutingModule } from './restablece-routing.module';
import { EditlogiComponent } from '../modulos/login/editlogi/editlogi.component';
import { MatCurrencyFormatModule } from 'mat-currency-format';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditlogiComponent],
  imports: [
    CommonModule,
    RestableceRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule,
    MatCurrencyFormatModule
  ], exports:[
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgbModule
  ]
})
export class RestableceModule { }
