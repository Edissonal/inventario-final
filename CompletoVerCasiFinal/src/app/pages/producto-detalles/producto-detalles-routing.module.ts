import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoDetallesPage } from './producto-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoDetallesPageRoutingModule {}
