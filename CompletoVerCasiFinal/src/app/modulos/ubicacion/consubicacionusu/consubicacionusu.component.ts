import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../../../servicios/ubicacion.service';

@Component({
  selector: 'app-consubicacionusu',
  templateUrl: './consubicacionusu.component.html',
  styleUrls: ['./consubicacionusu.component.css']
})
export class ConsubicacionusuComponent implements OnInit {

  ubicacionn: any[] = [];
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
