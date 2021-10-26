import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallemenuproductopagePage } from './detallemenuproductopage.page';

const routes: Routes = [
  {
    path: '',
    component: DetallemenuproductopagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallemenuproductopagePageRoutingModule {}
