import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  @Input() progresBar: number;
  @Input() progresBarBackground = '#3366CC' 
  @Input() progresBarColor = '#ffffff' 
  @Input() respuesta: any; 

  constructor() { }

  ngOnInit() {
    if (this.respuesta) {
      console.log(this.respuesta);
      setTimeout(() => {
        for (this.progresBar = 0; this.progresBar <= 99; this.progresBar++) {
        }
      }, 300);
}
  }

}