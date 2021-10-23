import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "espacios"
})

export class EspaciosPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/\r?\n/g, '<br />');
    }
}