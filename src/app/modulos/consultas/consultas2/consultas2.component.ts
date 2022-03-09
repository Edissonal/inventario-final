import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../../servicios/consultas.service';

@Component({
  selector: 'app-consultas2',
  templateUrl: './consultas2.component.html',
  styleUrls: ['./consultas2.component.css']
})
export class Consultas2Component implements OnInit {

  buscar: any[]= [];
  termino: string;
  page = 1;
  pageSize = 10;
  constructor(private consultasService:ConsultasService) { }

  ngOnInit(): void {
  }

  consultas(termino) {
    this.consultasService.getConsultas(termino)
      .subscribe(res => {
        this.buscar = res['data'];
        console.log(this.buscar);
      }, error => {
        console.log(error);
      });
  }
}
