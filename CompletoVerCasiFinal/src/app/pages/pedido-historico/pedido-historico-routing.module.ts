import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoHistoricoPage } from './pedido-historico.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoHistoricoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoHistoricoPageRoutingModule {}
