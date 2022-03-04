import { Component, OnInit } from '@angular/core';
import { SedeService } from '../../../servicios/sede.service';

@Component({
  selector: 'app-conssedeusu',
  templateUrl: './conssedeusu.component.html',
  styleUrls: ['./conssedeusu.component.css']
})
export class ConssedeusuComponent implements OnInit {

  sedes: any[] = [];
  constructor(private sedeService: SedeService) { }

  ngOnInit() {
    this.consultasede();
  }

  consultasede() {               
    this.sedeService.getsede()
      .subscribe(res => {        
        this.sedes = res['data'];        
      },error => {
          console.log(<any>error)
       });

 }

 eliminarsede(id$) {
  this.sedeService.delsede(id$)
    .subscribe(res => {
      this.sedes = [];
      this.sedeService.getsede()
        .subscribe(res => {
          this.sedes = res['data'];
          console.log(this.sedes);
        }, error => {
          console.log(<any>error);
        });
    });
}

}
