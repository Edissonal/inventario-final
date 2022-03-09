import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../../servicios/equipos.service';
import { Equipos } from '../../../interfaces/equipos.interface';

@Component({
  selector: 'app-equipos2',
  templateUrl: './equipos2.component.html',
  styleUrls: ['./equipos2.component.css']
})
export class Equipos2Component implements OnInit {

  constructor(private equiposService: EquiposService) { }
  page = 1;
  pageSize = 10;
  equipos: Equipos[] = [];

  ngOnInit(): void {
    this.consulteuipos();
  }

  consulteuipos() {
    this.equiposService.getequipos()
      .subscribe(res => {
        this.equipos = res['data'];
    },error=>{
     
        console.log(error);
    })
  }

  
}
