import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalcomentariospedidoPage } from './modalcomentariospedido.page';

const routes: Routes = [
  {
    path: '',
    component: ModalcomentariospedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalcomentariospedidoPageRoutingModule {}
