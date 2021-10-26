import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BusquedaPageRoutingModule } from './busqueda-routing.module';
import { BusquedaPage } from './busqueda.page';
import { PipesModule } from 'src/app/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    BusquedaPageRoutingModule
  ],
  declarations: [BusquedaPage]
})
export class BusqudaPageModule {}
