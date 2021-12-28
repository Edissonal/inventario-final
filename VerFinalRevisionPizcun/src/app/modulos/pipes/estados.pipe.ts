import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'estados'
})
export class estadosPipe implements PipeTransform{

  transform(valor: number): string {
    

    if (valor == 0) {
       return 'finalizado'
    }
    
    if (valor == 1) {
      return 'en proceso'
    }

    } 
  
}