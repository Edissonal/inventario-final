import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Consultas2Component } from 'src/app/modulos/consultas/consultas2/consultas2.component';
import { Equipos2Component } from 'src/app/modulos/equipos/equipos2/equipos2.component';
import { EstandarComponent } from 'src/app/modulos/login/estandar/estandar.component';
import { Consmante2Component } from 'src/app/modulos/mantenimientos/consmante2/consmante2.component';
import { Provedores2Component } from 'src/app/modulos/provedores/provedores2/provedores2.component';
import { ConsmarcausuComponent } from '../../modulos/marca/consmarcausu/consmarcausu.component';


const routes: Routes = [

  {
    path: '',
    component:EstandarComponent,
    children:
      [
      { path: 'consultas2', component: Consultas2Component },
      { path: 'equipos2', component: Equipos2Component },
      { path: 'mante2', component: Consmante2Component },
      { path: 'provedores2', component: Provedores2Component },
      { path: 'provedores2', component: Provedores2Component },
      { path: 'consmarcaousu', component: ConsmarcausuComponent },
      { path:'**',redirectTo:'mante2'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstandarRoutingModule { }
