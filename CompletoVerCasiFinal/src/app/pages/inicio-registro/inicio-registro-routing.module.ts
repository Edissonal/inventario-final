import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioRegistroPage } from './inicio-registro.page';

const routes: Routes = [
  {
    path: '',
    component: InicioRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioRegistroPageRoutingModule {}
