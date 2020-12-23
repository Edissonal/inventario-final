import { Component, OnInit } from '@angular/core';
import { ProvedoresService } from '../../../servicios/provedores.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsultasService } from '../../../servicios/consultas.service';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-addcons',
  templateUrl: './addcons.component.html',
  styleUrls: ['./addcons.component.css']
})
export class AddconsComponent implements OnInit {

  provedores: any[] = [];
  consulta: any;
  termino: any;



  constructor(private provedoresService: ProvedoresService,
              private consultasService:ConsultasService,
             ) { 
    
  }

  buscar(termino:string) {
    this.consultasService.getpro(termino)
      .subscribe(resp => {
        this.consulta = resp['data'];
    })
   
  }
 
  ngOnInit() {
    this.consPro();
  }

  consPro() {
    this.provedoresService.getprovedor()
      .subscribe(res => {
        this.provedores = res['data'];
      }, error => {
         console.log(<any>error);
          
      })
  }

}
