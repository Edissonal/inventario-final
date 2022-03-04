import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  @Input() progresBar: number;
  @Input() progresBarBackground = '#3366CC' 
  @Input() progresBarColor = '#ffffff' 
  @Input() respuesta: any; 

  
  constructor() { }

  ngOnInit() {
    if (this.respuesta) {

      setTimeout(() => {
        for (this.progresBar = 0; this.progresBar <= 99; this.progresBar++) {
        }
      }, 300);
}
  }

}
