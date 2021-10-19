import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitiosPageRoutingModule } from './sitios-routing.module';

import { SitiosPage } from './sitios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SitiosPageRoutingModule
  ],
  declarations: [SitiosPage]
})
export class SitiosPageModule {}
