import { Component, OnInit } from '@angular/core';
import { Provedores1Service } from '../../servicios/provedores1.service';
import {Provedor} from "../../models/provedores";
import { removeSummaryDuplicates } from '@angular/compiler';

@Component({
  selector: 'app-listasprove',
  templateUrl: './listasprove.component.html',
  styleUrls: ['./listasprove.component.css']
})
export class ListasproveComponent implements OnInit {

  public provedores: Provedor[];
  constructor(private provedores1Service:Provedores1Service) { }

  ngOnInit() {
    console.log('dattos del servicio');
    this.mostrarPro();
 
  }
  mostrarPro() {
  
    this.provedores1Service.getProvedor()
    .subscribe(
      result => {
        if (result.code != 200) {
          console.log(result);
        } else {
          
          this.provedores = result.data;
          console.log(this.provedores);
        }
      }, error => {
        console.log(<any>error);
      }
    );


}

}
