import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../../servicios/equipos.service';
import { Equipos } from '../../../interfaces/equipos.interface';

@Component({
  selector: 'app-consequipo',
  templateUrl: './consequipo.component.html',
  styleUrls: ['./consequipo.component.css']
})
export class ConsequipoComponent implements OnInit {
  equipos: Equipos[] = [];
  page = 1;
  pageSize = 10;
  constructor(private equiposService:EquiposService) { }

  ngOnInit() {
    this.consultaequi();
  }

  consultaequi() {
    this.equiposService.getequipos()
    .subscribe(res => {
      this.equipos = res['data'];
    }, error => {
        console.log(<any>error);
  })
  }
  eliminarequi(id) {
    this.equiposService.deleuqipo(id)
      .subscribe(res => { 
        this.equipos=[];
        this.equiposService.getequipos()
          .subscribe(res => {
            this.equipos = res['data'];
          }, error => {
              console.log(<any>error); 
          });

      });
  }

}
