import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasproPage } from './categoriaspro.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasproPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasproPageRoutingModule {}
