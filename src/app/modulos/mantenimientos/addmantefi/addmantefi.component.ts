import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addmantefi',
  templateUrl: './addmantefi.component.html',
  styleUrls: ['./addmantefi.component.css']
})
export class AddmantefiComponent implements OnInit {
  @Input() datos: any;
  vista: boolean = false;
  constructor() { 
    if(this.datos){
      this.vista = true;
      console.log("esto es una prueba ", this.datos);
      
    } 
  
    
  }

  ngOnInit() {

  
  }

}
