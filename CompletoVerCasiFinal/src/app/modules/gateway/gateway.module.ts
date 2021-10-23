import { DashboardPageModule } from './../../pages/dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GatewayPageRoutingModule } from './gateway-routing.module';

import { GatewayPage } from './gateway.page';
import { PipesModule } from 'src/app/pipes.module';
import { CategoriasproPageModule } from '../categoriaspro/categoriaspro.module';
import { RestaurantesPageModule } from '../restaurantes/restaurantes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GatewayPageRoutingModule,
    DashboardPageModule,
    PipesModule,
    CategoriasproPageModule,
    RestaurantesPageModule
  ],
  declarations: [GatewayPage]
})
export class GatewayPageModule {}
