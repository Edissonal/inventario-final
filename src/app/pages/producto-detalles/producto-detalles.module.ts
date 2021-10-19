import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductoDetallesPageRoutingModule } from './producto-detalles-routing.module';
import { ProductoDetallesPage } from './producto-detalles.page';
import { PipesModule } from 'src/app/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ProductoDetallesPageRoutingModule
  ],
  declarations: [ProductoDetallesPage ]
})
export class ProductoDetallesPageModule {}
