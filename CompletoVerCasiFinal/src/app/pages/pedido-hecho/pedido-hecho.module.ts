import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PedidoHechoPageRoutingModule } from './pedido-hecho-routing.module';
import { PedidoHechoPage } from './pedido-hecho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoHechoPageRoutingModule
  ],
  declarations: [PedidoHechoPage]
})
export class PedidoHechoPageModule {}
