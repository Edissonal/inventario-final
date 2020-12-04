import { Component, OnInit } from '@angular/core';
import { ProvedoresService } from '../../../servicios/provedores.service';

@Component({
  selector: 'app-consprovedor',
  templateUrl: './consprovedor.component.html',
  styleUrls: ['./consprovedor.component.css']
})
export class ConsprovedorComponent implements OnInit {
  provedores: any[] = [];
  constructor(private provedoresService: ProvedoresService) { }

  ngOnInit() {
    this.consultapro();
  }
  consultapro() {
    this.provedoresService.getprovedor()
      .subscribe(res => {
        this.provedores = res['data'];
      },error => {
          console.log(<any>error)
       });

 }

  eliminarpro(id$) {
    this.provedoresService.delprovedor(id$)
      .subscribe(res => {
        this.provedores = [];
        this.provedoresService.getprovedor()
          .subscribe(res => {
            this.provedores = res['data'];
            console.log(this.provedores);
          }, error => {
            console.log(<any>error);
          });
      });
  }
}
