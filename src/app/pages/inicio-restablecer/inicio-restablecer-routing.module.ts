import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioRestablecerPage } from './inicio-restablecer.page';

const routes: Routes = [
  {
    path: '',
    component: InicioRestablecerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioRestablecerPageRoutingModule {}
