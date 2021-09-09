import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from '../../../servicios/mantenimientos.service';

@Component({
  selector: 'app-consulman',
  templateUrl: './consulman.component.html',
  styleUrls: ['./consulman.component.css']
})
export class ConsulmanComponent implements OnInit {

  buscar: any[] = [];
  txtMan: string;
  date: Date;
  total: number[] = [];
  valor: number;
  page = 1;
  pageSize = 10;
  constructor(private mantenimientosService: MantenimientosService) { }

 
  ngOnInit() { 
 
  }


  consulman(txtMan) {
    console.log(txtMan);
    this.mantenimientosService.getManteni(txtMan)
      .subscribe((res:any) => {
        console.log(res);
        this.buscar = res['data'];
        this.total = res['data'].map(function (po, index, array) {
          return parseInt(po.costo_man); 
        });
        let total = 0;
        this.total.forEach(function (a) { total += a; });
        this.valor = total;

       
       
     
      }, error => {
        console.log(<any>error)
      });
    

  }

  eliminarman(id,txtMan) {
     this.mantenimientosService.deleteMan(id)
       .subscribe(res => { 
         this.buscar = [];
         this.mantenimientosService.getManteni(txtMan)
           .subscribe(res => {
             this.buscar = res['data'];
           });
       });
     
  
  }
}
