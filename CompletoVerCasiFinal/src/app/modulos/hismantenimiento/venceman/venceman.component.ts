import { Component, OnInit } from '@angular/core';
import { HismantenimientoService } from '../../../servicios/hismantenimiento.service';

@Component({
  selector: 'app-venceman',
  templateUrl: './venceman.component.html',
  styleUrls: ['./venceman.component.css']
})
export class VencemanComponent implements OnInit {

  listas:object;

  constructor(private hismantenimientoService:HismantenimientoService) { }

  ngOnInit(): void {
    this.consultar();
  }

  consultar() {
    this.hismantenimientoService.getvenceman()
      .subscribe(res => {
        this.listas = res['data'];
      });
    
  }
  

   fechas(fecha_actu:string,fecha_pro_man:string) {
    
       if (fecha_actu > fecha_pro_man) {
         return true;
      }
     
     return false;
  }

}
