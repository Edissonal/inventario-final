import { Component, OnInit } from '@angular/core';
import { ProvedoresService } from '../../../servicios/provedores.service';

@Component({
  selector: 'app-provedores2',
  templateUrl: './provedores2.component.html',
  styleUrls: ['./provedores2.component.css']
})
export class Provedores2Component implements OnInit {

  provedores: any[] = [];
  constructor(private ProvedoresService:ProvedoresService) { }

  ngOnInit(): void {
    this.consultarpro();
  }


  consultarpro() {
    this.ProvedoresService.getprovedor()
      .subscribe(res => {
        this.provedores = res['data'];
        console.log(this.provedores);

      }, error => {
        console.log(error);
      });
  }
}
