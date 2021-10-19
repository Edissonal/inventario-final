import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { MarcaService } from '../../../servicios/marca.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Marcas } from '../../../interfaces/marcas.interfaces';

@Component({
  selector: 'app-addmarca',
  templateUrl: './addmarca.component.html',
  styleUrls: ['./addmarca.component.css']
})
export class AddmarcaComponent implements OnInit {

  formaForm: FormGroup;
  marca: Marcas;
  validacion: number;
  mensaje: string;
  constructor(private fb: FormBuilder,
              private router: Router,
              private marcaService: MarcaService) { 
              this.crearFormulario();           
}

  ngOnInit() {
  }
  get nombreNovalido() {
    return this.formaForm.get('nombre_ma').invalid && this.formaForm.get('nombre_ma').touched;
  }


  tiempo() {
    setTimeout(() => {
      this.validacion = null;
    }, 5000);
  }

  crearFormulario() { 

    this.formaForm = this.fb.group({
      nombre_ma: ['', [Validators.required,Validators.minLength(4)]],
      });
  }

  onSubmit() {
    if (this.formaForm.invalid) {
      
      Object.values(this.formaForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.marca = this.saveMarca();
    this.marcaService.postmarca(this.marca)
      .subscribe(res => { 
        console.log(res);
        if (res.code == 404) {
          console.log(res);
          this.validacion = res.code;
          this.mensaje = res.message;
          this.tiempo();

        } else {
          this.validacion = res.code;
          this.mensaje = res.message;
          this.tiempo();
        }
        // this.router.navigate(['/auth/consultarma']);
      }, error => console.log(<any>error));
      this.formaForm.reset();
  }

  saveMarca() {
    const saveMarca = {
      nombre_ma: this.formaForm.get('nombre_ma').value,

    }
    return saveMarca;
  }

}
