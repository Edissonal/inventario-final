import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallemenupedidoproductoPage } from './detallemenupedidoproducto.page';

const routes: Routes = [
  {
    path: '',
    component: DetallemenupedidoproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallemenupedidoproductoPageRoutingModule {}
