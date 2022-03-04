import { Component, OnInit } from '@angular/core';
import { ProvedoresService } from '../../servicios/provedores.service';


@Component({
  selector: 'app-conprove',
  templateUrl: './conprove.component.html',
  styleUrls: ['./conprove.component.css']
})
export class ConproveComponent implements OnInit {
  provedores: any[] = [];
  constructor(private provedoresService: ProvedoresService) { 
  }

  ngOnInit() {
    this.consulta();
  }

  consulta() {
    this.provedoresService.getprovedor()
    .subscribe(res => { 
      console.log('resultados de lista');
      this.provedores = res['data'];
      console.log(this.provedores);
    },error => {
        console.log(<any>error);
    });

  }

  eliminarpro(id$) {
    this.provedoresService.delprovedor(id$)
      .subscribe(res => {
        this.provedores = [];
        this.provedoresService.getprovedor()
        .subscribe(res => { 
          console.log('resultados de lista');
          this.provedores = res['data'];
          console.log(this.provedores);
        },error => {
            console.log(<any>error);
        });
    })
   }
}
