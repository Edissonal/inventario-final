import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe'; //our pipe which we generate
import { EspaciosPipe } from 'src/app/pipes/espacios.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ TruncatePipe, EspaciosPipe ],
    exports: [ TruncatePipe, EspaciosPipe ]
})
export class PipesModule { }