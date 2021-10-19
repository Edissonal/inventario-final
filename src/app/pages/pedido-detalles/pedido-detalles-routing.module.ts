import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoDetallesPage } from './pedido-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoDetallesPageRoutingModule {}
