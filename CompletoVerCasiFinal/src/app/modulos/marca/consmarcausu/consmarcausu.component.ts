import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../servicios/marca.service';
import { Marcas } from '../../../interfaces/marcas.interfaces';

@Component({
  selector: 'app-consmarcausu',
  templateUrl: './consmarcausu.component.html',
  styleUrls: ['./consmarcausu.component.css']
})
export class ConsmarcausuComponent implements OnInit {

  marcas: Marcas[] = [];
  constructor(private marcaService: MarcaService) { }

  ngOnInit() {
    this.consultamar();
  }

  consultamar() {
    this.marcaService.getmarca()
      .subscribe(res => {
        this.marcas = res['data'];
      },error => {
          console.log(<any>error)
       });

 }

 eliminarmar(id$) {
  this.marcaService.delmarca(id$)
    .subscribe(res => {
      this.marcas = [];
      this.marcaService.getmarca()
        .subscribe(res => {
          this.marcas = res['data'];
          console.log(this.marcas);
        }, error => {
          console.log(<any>error);
        });
    });
}

}
