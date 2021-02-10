import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../../servicios/consultas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-constman',
  templateUrl: './constman.component.html',
  styleUrls: ['./constman.component.css']
})
export class ConstmanComponent implements OnInit {


  termino: string;
  busquedas: any[] = [];
  manteForm: FormGroup;
  manteni: any[] =[];



  constructor(private consultasService: ConsultasService,
              private fb: FormBuilder,
              private cdref: ChangeDetectorRef
  ) {
    
    this.validaform();
  }
  ngOnInit() {
  }


  consultas(termino) {
    console.log(termino);
    this.consultasService.getConsultas(termino)
      .subscribe(res => {
        console.log(res);
        this.busquedas = res['data'];
        this.cdref.detectChanges();
      }, error => {
          console.log(<any>error);
    })
  }

  validaform() {
    this.manteForm = this.fb.group({
      id_equi: ['', Validators.required],
      id_ubi: ['', Validators.required],
      id_ciu: ['', Validators.required], 
      id_sede: ['', Validators.required],
     // perio: ['', Validators.required],
      fecha_ini: ['', Validators.required],
      fecha_fi: ['', Validators.required],
      serial_con: ['', [Validators.required,Validators.minLength(3)]]
    });
  }
  

  onSubmit() { 
  //  this.manteni = this.saveMan();
    this.manteni[this.manteForm.get('id_equi').value];

    console.log(this.manteni);

  //  console.log(this.busquedas);
  }


  saveMan() {
    /*  const saveman ={
      id_equi: this.manteForm.get('id_equi').value,
      id_ubi: this.manteForm.get('id_ubi').value,
      id_ciu: this.manteForm.get('id_ciu').value,
      id_sede: this.manteForm.get('id_sede').value,
      fecha_ini: this.manteForm.get('fecha_ini').value,
      fecha_fi: this.manteForm.get('fecha_fi').value,
      serial_con: this.manteForm.get('serial_con').value
    }
    return saveman;*/
 }

  
  
}
