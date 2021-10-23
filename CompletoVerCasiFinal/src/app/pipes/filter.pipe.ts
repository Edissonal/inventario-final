import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultArticulos = [];
    for ( const result of value ){
        if( result.articulo.indexOf( arg ) > -1 ){
            console.log("SI");
        } 
    }

  }

}
