import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalcomentariospedidoPageRoutingModule } from './modalcomentariospedido-routing.module';

import { ModalcomentariospedidoPage } from './modalcomentariospedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalcomentariospedidoPageRoutingModule
  ],
  declarations: [ModalcomentariospedidoPage]
})
export class ModalcomentariospedidoPageModule {}
