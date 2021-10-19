import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalpedidoproductoscompradosPage } from './modalpedidoproductoscomprados.page';

const routes: Routes = [
  {
    path: '',
    component: ModalpedidoproductoscompradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalpedidoproductoscompradosPageRoutingModule {}
