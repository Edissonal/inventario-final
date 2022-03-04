import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from '../../../servicios/mantenimientos.service';

@Component({
  selector: 'app-consmante2',
  templateUrl: './consmante2.component.html',
  styleUrls: ['./consmante2.component.css']
})
export class Consmante2Component implements OnInit {

  
  buscar: any[] = [];
  valor: number;
  total: number[]=[];

  constructor(private mantenimientosService:MantenimientosService) { }
  
  ngOnInit(): void {
  }

  consmante(valor) {
    this.mantenimientosService.getManteni(valor)
      .subscribe((res:any) => {
        this.buscar = res['data'];
        this.total = res['data'].map(function (po, index, array) {
          return parseInt(po.costo_man); 
        });

        let total = 0;
        this.total.forEach(function (a) { total += a; });
        this.valor = total;
        console.log(this.buscar);
      },error => {
        console.log(error);
      });
    
  }



}
