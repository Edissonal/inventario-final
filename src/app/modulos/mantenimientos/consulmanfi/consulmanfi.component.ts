import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../../servicios/consultas.service';
import { ProvedoresService } from '../../../servicios/provedores.service';
import { MantenimientosService } from '../../../servicios/mantenimientos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulmanfi',
  templateUrl: './consulmanfi.component.html',
  styleUrls: ['./consulmanfi.component.css']
})
export class ConsulmanfiComponent implements OnInit {


  provedores: any[] = [];
  mante: any;
  termino: any;


  constructor(private mantenimientosService: MantenimientosService,
              private provedoresService:ProvedoresService) { }

  ngOnInit() {
    this.consPro();
  }

  consPro() {
    this.provedoresService.getprovedor()
      .subscribe(resp => {
        console.log(resp);
        this.provedores = resp['data'];
      }, error => {
          console.log(error);
    })
  }

  buscaMan(termino:string) {
    this.mantenimientosService.getMantenimiento(termino)
      .subscribe(resp => { 
        console.log(resp);
        this.mante = resp['data'];
      }, error => {
          console.log(error);
         
      });
  }
   
}
