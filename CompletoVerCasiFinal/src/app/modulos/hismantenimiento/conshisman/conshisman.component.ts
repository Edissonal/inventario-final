import { Component, OnInit } from '@angular/core';
import { HismantenimientoService } from '../../../servicios/hismantenimiento.service';

@Component({
  selector: 'app-conshisman',
  templateUrl: './conshisman.component.html',
  styleUrls: ['./conshisman.component.css']
})
export class ConshismanComponent {

  busquedas: any[] = [];
  termino: string;
  constructor(private hismantenimientoService:HismantenimientoService) { }

  consul(termino) {
    console.log(termino);
    
    this.hismantenimientoService.getConsultas(termino)
      .subscribe(resp => {
       console.log(resp);
       this.busquedas = resp['data'];
 
      }, error =>{
        console.log(<any>error)
      });

  }
}
