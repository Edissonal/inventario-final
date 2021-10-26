import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalmenuproductoPageRoutingModule } from './modalmenuproducto-routing.module';

import { ModalmenuproductoPage } from './modalmenuproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalmenuproductoPageRoutingModule
  ],
  declarations: [ModalmenuproductoPage]
})
export class ModalmenuproductoPageModule {}
