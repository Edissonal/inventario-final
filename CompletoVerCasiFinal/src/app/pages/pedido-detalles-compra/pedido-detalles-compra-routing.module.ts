import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoDetallesCompraPage } from './pedido-detalles-compra.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoDetallesCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoDetallesCompraPageRoutingModule {}
