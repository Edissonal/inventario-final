import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../servicios/marca.service';

@Component({
  selector: 'app-consmarcausu',
  templateUrl: './consmarcausu.component.html',
  styleUrls: ['./consmarcausu.component.css']
})
export class ConsmarcausuComponent implements OnInit {

  marcas: any[] = [];
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
