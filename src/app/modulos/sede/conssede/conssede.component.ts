import { Component, OnInit } from '@angular/core';
import { SedeService } from '../../../servicios/sede.service';

@Component({
  selector: 'app-conssede',
  templateUrl: './conssede.component.html',
  styleUrls: ['./conssede.component.css']
})
export class ConssedeComponent implements OnInit {

  sedes: any[] = [];
  page = 1;
  pageSize = 10;
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
