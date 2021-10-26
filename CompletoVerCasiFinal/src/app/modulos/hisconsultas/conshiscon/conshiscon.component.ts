import { Component, OnInit } from '@angular/core';
import { HisconsultasService } from '../../../servicios/hisconsultas.service';

@Component({
  selector: 'app-conshiscon',
  templateUrl: './conshiscon.component.html',
  styleUrls: ['./conshiscon.component.css']
})
export class ConshisconComponent {

  busquedas: any[] = [];
  termino: string;
  constructor(private hisconsultasService:HisconsultasService) { }

  consul(termino) {
    console.log(termino);
    
    this.hisconsultasService.getConsultas(termino)
      .subscribe(resp => {
       console.log(resp);
       this.busquedas = resp['data'];
 
      }, error =>{
        console.log(<any>error)
      });

  }

}
