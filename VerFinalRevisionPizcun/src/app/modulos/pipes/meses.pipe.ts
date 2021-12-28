import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'meses'
})
export class MesesPipe implements PipeTransform{

  transform(valor: number): string {
    

    if (valor == 3) {
       return 'trimestral'
    }
    
    if (valor == 6) {
      return 'semestral'
    }
    
    if (valor == 12) {
      return 'anual'
   }


    }
  
}