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
  constructor(private mantenimientosService:MantenimientosService) { }

  ngOnInit() {
  }

  consulman(txtMan){
    console.log(txtMan);
    this.mantenimientosService.getManteni(txtMan)
      .subscribe(res => {
        console.log(res);
        this.buscar = res['data'];
      }, error => {
          console.log(<any>error)
      });
    

  }
}
