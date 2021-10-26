import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PedidoDetallesCompraPageRoutingModule } from './pedido-detalles-compra-routing.module';
import { PedidoDetallesCompraPage } from './pedido-detalles-compra.page';
import { CountdownModule } from 'ngx-countdown';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountdownModule,
    PedidoDetallesCompraPageRoutingModule
  ],
  declarations: [PedidoDetallesCompraPage]
})
export class PedidoDetallesCompraPageModule {}
