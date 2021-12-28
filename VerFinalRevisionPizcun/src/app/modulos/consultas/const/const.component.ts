import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../../servicios/consultas.service';
import { Consultas } from '../../../interfaces/consultas.interface';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { HisconsultasService } from '../../../servicios/hisconsultas.service';


@Component({
  selector: 'app-const',
  templateUrl: './const.component.html',
  styleUrls: ['./const.component.css']
})
export class ConstComponent{

  busquedas: Consultas[] = [];
  termino: string;
  page = 1;
  pageSize = 10;
  
  constructor(private consultasService:ConsultasService,
              private usuariosService:UsuariosService,
              private hisconsultasService:HisconsultasService) { }

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
    this.consultasService.getConsulta(id)
    .subscribe((res:any) => {

      let fec = new Date();
      let fachamo = `${fec.getFullYear()}-${fec.getMonth() + 1}-${fec.getDate()}`;
      let estado_hcon = 'Delete';
      let idusu = this.usuariosService.data.data.id_usu;

          const hdata:any = {
            "id_ma": res.data.id_ma,
            "id_equi": res.data.id_equi,
            "id_pro": res.data.id_pro,
            "id_ciu": res.data.id_ciu,
            "id_sede": res.data.id_sede,
            "id_ubi": res.data.id_ubi,
            "modelo_con": res.data.modelo_con,
            "serial_con": res.data.serial_con,
            "placa_con": res.data.placa_con,          
            "mantenimiento_con": res.data.mantenimiento_con,    
            "estado_hcon": estado_hcon,
            "fecha_hcon": fachamo,
            "id_usu": idusu
          }

          this.consultasService.posConsH(hdata)
            .subscribe(res => { 
		            this.consultasService.delConsulta(id)
			              .subscribe(res => {
				                this.busquedas = [];
					          this.consultasService.getConsultas(termino)
				                .subscribe(res => { 
			                      this.busquedas = res['data'];
				                });
		              	});

		        }); 

      })
    
  }

}
