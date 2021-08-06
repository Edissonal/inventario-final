import { Component, Input, OnInit } from '@angular/core';
import { ConsultasService } from '../../../servicios/consultas.service';
import { ProvedoresService } from '../../../servicios/provedores.service';
import { MantenimientosService } from '../../../servicios/mantenimientos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulmanfi',
  templateUrl: './consulmanfi.component.html',
  styleUrls: ['./consulmanfi.component.css']
})
export class ConsulmanfiComponent implements OnInit {

  provedores: any[] = [];
  mante: any;
  termino: any;
  formafi: FormGroup;


  constructor(private mantenimientosService: MantenimientosService,
              private provedoresService: ProvedoresService,
              private fb: FormBuilder) {
              this.formularioFi();
              }


  get nopro() {
    return this.formafi.get('prove').invalid && this.formafi.get('prove').touched;
  }
  ngOnInit() {
    this.consPro();
  }
  
  formularioFi() {
    this.formafi = this.fb.group({
      prove: ['', [Validators.required]]
    })
  }
  consPro() {
    this.provedoresService.getprovedor()
      .subscribe(resp => {
        console.log(resp);
        this.provedores = resp['data'];
      }, error => {
          console.log(error);
    })
  }

  buscaMan(termino:string) {
    this.mantenimientosService.getMantenimiento(termino)
      .subscribe(resp => { 
        console.log(resp);
        this.mante = resp['data'];
      }, error => {
          console.log(error);
         
      });
  }
  
  reseteo(argumento:boolean) {
    if (argumento) {
      this.formafi.reset();
   
    }

  }

  validacion(arg:boolean) {
    if (arg) {
      if (this.formafi.invalid) {
      console.log('llegada de campo');
      
        Object.values(this.formafi.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
    return;
    }
  }
}
