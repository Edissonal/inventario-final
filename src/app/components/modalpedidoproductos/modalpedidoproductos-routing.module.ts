import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalpedidoproductosPage } from './modalpedidoproductos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalpedidoproductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalpedidoproductosPageRoutingModule {}
