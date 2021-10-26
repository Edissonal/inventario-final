import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../../../servicios/ubicacion.service';
import { Ubicacion } from '../../../interfaces/ubicacion.interface';

@Component({
  selector: 'app-consubicacion',
  templateUrl: './consubicacion.component.html',
  styleUrls: ['./consubicacion.component.css']
})
export class ConsubicacionComponent implements OnInit {

  ubicacionn: Ubicacion[] = [];
  page = 1;
  pageSize = 10;
  constructor(private ubicacionService: UbicacionService) { }

  ngOnInit() {
    this.consultaubi();
  }

  consultaubi() {
    this.ubicacionService.getubicacion()
      .subscribe(res => {
        this.ubicacionn = res['data'];
      },error => {
          console.log(<any>error)
       });

 }

 eliminarubi(id$) {
  this.ubicacionService.delubicacion(id$)
    .subscribe(res => {
      this.ubicacionn = [];
      this.ubicacionService.getubicacion()
        .subscribe(res => {
          this.ubicacionn = res['data'];
          console.log(this.ubicacionn);
        }, error => {
          console.log(<any>error);
        });
    });
}

}
