import { Component, OnInit } from '@angular/core';
import { HismantenimientoService } from '../../../servicios/hismantenimiento.service';
import { HistoMantenimientos } from 'src/app/interfaces/histomantenimiento.interface ';

@Component({
  selector: 'app-conshisman',
  templateUrl: './conshisman.component.html',
  styleUrls: ['./conshisman.component.css']
})
export class ConshismanComponent {

  busquedas: HistoMantenimientos[] = [];
  termino: string;
  page = 1;
  pageSize = 10;
  
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
