import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriasproPageRoutingModule } from './categoriaspro-routing.module';

import { CategoriasproPage } from './categoriaspro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriasproPageRoutingModule
  ],
  declarations: [CategoriasproPage],
  exports:[CategoriasproPage]
})
export class CategoriasproPageModule {}
