import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallemenuproductopagePageRoutingModule } from './detallemenuproductopage-routing.module';

import { DetallemenuproductopagePage } from './detallemenuproductopage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallemenuproductopagePageRoutingModule
  ],
  declarations: [DetallemenuproductopagePage]
})
export class DetallemenuproductopagePageModule {}
