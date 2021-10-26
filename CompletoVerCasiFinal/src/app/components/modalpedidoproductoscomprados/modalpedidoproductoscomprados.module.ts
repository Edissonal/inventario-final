import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalpedidoproductoscompradosPageRoutingModule } from './modalpedidoproductoscomprados-routing.module';

import { ModalpedidoproductoscompradosPage } from './modalpedidoproductoscomprados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalpedidoproductoscompradosPageRoutingModule
  ],
  declarations: [ModalpedidoproductoscompradosPage]
})
export class ModalpedidoproductoscompradosPageModule {}
