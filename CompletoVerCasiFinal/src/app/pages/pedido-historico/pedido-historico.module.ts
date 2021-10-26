import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { CalificacionComponent } from 'src/app/components/calificacion/calificacion.component';
import { PedidoHistoricoPage } from './pedido-historico.page';
import { PedidoHistoricoPageRoutingModule } from './pedido-historico-routing.module';


@NgModule({
  entryComponents: [
    // CalificacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoHistoricoPageRoutingModule
  ],
  declarations: [PedidoHistoricoPage]
})
export class PedidoHistoricoPageModule { }
