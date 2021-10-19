import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoHechoPage } from './pedido-hecho.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoHechoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoHechoPageRoutingModule {}
