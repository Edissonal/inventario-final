import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PedidoDetallesPageRoutingModule } from './pedido-detalles-routing.module';
import { PedidoDetallesPage } from './pedido-detalles.page';
import { CalificacionComponent } from 'src/app/components/calificacion/calificacion.component';

@NgModule({
    entryComponents: [
        CalificacionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PedidoDetallesPageRoutingModule
    ],
    declarations: [PedidoDetallesPage, CalificacionComponent]
})
export class PedidoDetallesPageModule { }
