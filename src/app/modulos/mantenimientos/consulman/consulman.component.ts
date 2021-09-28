import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MantenimientosService } from '../../../servicios/mantenimientos.service';
import { UsuariosService } from '../../../servicios/usuarios.service';

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
  constructor(private mantenimientosService: MantenimientosService,
              private usuariosService:UsuariosService) { }

 
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
    this.mantenimientosService.getMa(id)
      .subscribe((res:any) => {
        
        let fec = new Date();
        let fachamo = `${fec.getFullYear()}-${fec.getMonth() + 1}-${fec.getDate()}`;
        let estado_hman = 'delete';
        let idusu = this.usuariosService.data.data.id_usu;
          
        const hdata:any = {
          "id_ma": res.data.id_ma,
          "id_equi": res.data.id_equi,
          "id_pro": res.data.id_pro,
          "id_ciu": res.data.id_ciu,
          "id_sede": res.data.id_sede,
          "id_ubi": res.data.id_ubi,
          "id_con": res.data.id_con,
          "fecha_man": res.data.fecha_man,
          "esta_man": res.data.estado_man,
          "peri_man": res.data.periodicidad_man,
          "fecha_pro_man": res.data.fecha_pro_man,
          "costo_man": res.data.costo_man,
          "estado_hman": estado_hman,
          "fecha_hman": fachamo,
          "id_usu": idusu
        }
        this.mantenimientosService.posManteH(hdata)
          .subscribe(res => {
         
        })
        this.mantenimientosService.deleteMan(id)
          .subscribe(res => {
            this.buscar = [];
        
          this.mantenimientosService.getManteni(txtMan)
            .subscribe(res => {
              this.buscar = res['data'];
            });
          });
         
       });
     
    
  }
}
