import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioRestablecerPageRoutingModule } from './inicio-restablecer-routing.module';
import { InicioRestablecerPage } from './inicio-restablecer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioRestablecerPageRoutingModule
  ],
  declarations: [InicioRestablecerPage]
})
export class InicioRestablecerPageModule {}
