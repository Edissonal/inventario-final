import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioLoginPageRoutingModule } from './inicio-login-routing.module';
import { InicioLoginPage } from './inicio-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioLoginPageRoutingModule
  ],
  declarations: [InicioLoginPage]
})
export class InicioLoginPageModule {}
