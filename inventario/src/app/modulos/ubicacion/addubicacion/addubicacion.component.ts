import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { UbicacionService } from '../../../servicios/ubicacion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addubicacion',
  templateUrl: './addubicacion.component.html',
  styleUrls: ['./addubicacion.component.css']
})
export class AddubicacionComponent implements OnInit {

  formaForm: FormGroup;
  ubicacion: any;
  constructor(private fb: FormBuilder,
              private ubicacionService: UbicacionService) { 
              this.crearFormulario();           
}

  ngOnInit() {
  }

  get nombreNovalido() {
    return this.formaForm.get('nombre_ubi').invalid && this.formaForm.get('nombre_ubi').touched;
  }

  crearFormulario() { 

    this.formaForm = this.fb.group({
      nombre_ubi: ['', [Validators.required,Validators.minLength(4)]],
      });
  }

  onSubmit() {
    if (this.formaForm.invalid) {
      
      Object.values(this.formaForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.ubicacion = this.saveUbicacion();
    this.ubicacionService.postubicacion(this.ubicacion)
      .subscribe(newpro => { 
        console.log(newpro);
      }, error => console.log(<any>error));
      this.formaForm.reset();
  }

  saveUbicacion() {
    const saveUbicacion = {
      nombre_ubi: this.formaForm.get('nombre_ubi').value,

    }
    return saveUbicacion;
  }

}
