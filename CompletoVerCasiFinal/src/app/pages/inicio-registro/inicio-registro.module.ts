import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioRegistroPageRoutingModule } from './inicio-registro-routing.module';
import { InicioRegistroPage } from './inicio-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioRegistroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InicioRegistroPage]
})
export class InicioRegistroPageModule {}
