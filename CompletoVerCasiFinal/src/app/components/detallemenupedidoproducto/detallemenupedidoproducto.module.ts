import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallemenupedidoproductoPageRoutingModule } from './detallemenupedidoproducto-routing.module';

import { DetallemenupedidoproductoPage } from './detallemenupedidoproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallemenupedidoproductoPageRoutingModule
  ],
  declarations: [DetallemenupedidoproductoPage]
})
export class DetallemenupedidoproductoPageModule {}
