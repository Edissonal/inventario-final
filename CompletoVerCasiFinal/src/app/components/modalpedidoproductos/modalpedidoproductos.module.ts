import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalpedidoproductosPageRoutingModule } from './modalpedidoproductos-routing.module';

import { ModalpedidoproductosPage } from './modalpedidoproductos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalpedidoproductosPageRoutingModule
  ],
  declarations: [ModalpedidoproductosPage]
})
export class ModalpedidoproductosPageModule {}
