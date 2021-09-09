import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../../servicios/consultas.service';


@Component({
  selector: 'app-const',
  templateUrl: './const.component.html',
  styleUrls: ['./const.component.css']
})
export class ConstComponent{

  busquedas: any[] = [];
  termino: string;
  page = 1;
  pageSize = 10;
  
  constructor(private consultasService:ConsultasService) { }

  consul(termino) {
    console.log(termino);
    
    this.consultasService.getConsultas(termino)
      .subscribe(resp => {
       console.log(resp);
       this.busquedas = resp['data'];
 
      }, error =>{
        console.log(<any>error)
      });

  }

  eliminarcon(id,termino) {
    this.consultasService.delConsulta(id)
      .subscribe(res => {
        this.busquedas = [];
        this.consultasService.getConsultas(termino)
          .subscribe(res => { 
            this.busquedas = res['data'];
          });
      });
    
  }
}
