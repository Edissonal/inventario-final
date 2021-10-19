import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoriasarticulosPageRoutingModule } from './categoriasarticulos-routing.module';
import { CategoriasarticulosPage } from './categoriasarticulos.page';
import { PipesModule } from 'src/app/pipes.module';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    NgxPaginationModule,
    CategoriasarticulosPageRoutingModule
  ],
  declarations: [CategoriasarticulosPage ]
})
export class CategoriasarticulosPageModule {}
