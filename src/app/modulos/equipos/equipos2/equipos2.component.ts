import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../../servicios/equipos.service';

@Component({
  selector: 'app-equipos2',
  templateUrl: './equipos2.component.html',
  styleUrls: ['./equipos2.component.css']
})
export class Equipos2Component implements OnInit {

  constructor(private equiposService:EquiposService) { }
  equipos: any[] = [];

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
