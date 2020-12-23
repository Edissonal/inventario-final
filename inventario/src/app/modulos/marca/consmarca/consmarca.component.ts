import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../servicios/marca.service';

@Component({
  selector: 'app-consmarca',
  templateUrl: './consmarca.component.html',
  styleUrls: ['./consmarca.component.css']
})
export class ConsmarcaComponent implements OnInit {

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
