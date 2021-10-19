import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalmenuproductoPage } from './modalmenuproducto.page';

const routes: Routes = [
  {
    path: '',
    component: ModalmenuproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalmenuproductoPageRoutingModule {}
