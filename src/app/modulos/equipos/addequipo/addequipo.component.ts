import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { EquiposService } from '../../../servicios/equipos.service';

@Component({
  selector: 'app-addequipo',
  templateUrl: './addequipo.component.html',
  styleUrls: ['./addequipo.component.css']
})
export class AddequipoComponent implements OnInit {
  formaForm: FormGroup;
  equipo: any;

  constructor(private fb: FormBuilder,
                private equiposService: EquiposService) {
                  this.crearFormulario();  
                   }
  ngOnInit() {
      }
  
  get equipoNovalido() {
    return this.formaForm.get('nombre_equi').invalid && this.formaForm.get('nombre_equi').touched;
      }

  crearFormulario() {
    this.formaForm = this.fb.group({
      nombre_equi: ['',[Validators.required,Validators.minLength(5)]]  
    });
      }
  onSubmit() {
    if (this.formaForm.invalid) {
      Object.values(this.formaForm.controls).forEach(control => {
        control.markAllAsTouched();   
      });
      return;
    }
    this.equipo = this.saveEquipo();
    this.equiposService.postequipo(this.equipo)
      .subscribe(newequi => {
        console.log(newequi);
      }, error => console.log(<any>error));
    this.formaForm.reset();
  }
  saveEquipo() { 
    const saveEquipo = {
      nombre_equi: this.formaForm.get('nombre_equi').value
    }
    return saveEquipo;
    }
  }
  

