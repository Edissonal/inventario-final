import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasarticulosPage } from './categoriasarticulos.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasarticulosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasarticulosPageRoutingModule {}
