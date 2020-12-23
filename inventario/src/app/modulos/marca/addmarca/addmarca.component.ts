import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { MarcaService } from '../../../servicios/marca.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addmarca',
  templateUrl: './addmarca.component.html',
  styleUrls: ['./addmarca.component.css']
})
export class AddmarcaComponent implements OnInit {

  formaForm: FormGroup;
  marca: any;
  constructor(private fb: FormBuilder,
              private marcaService: MarcaService) { 
              this.crearFormulario();           
}

  ngOnInit() {
  }

  get nombreNovalido() {
    return this.formaForm.get('nombre_ma').invalid && this.formaForm.get('nombre_ma').touched;
  }

  crearFormulario() { 

    this.formaForm = this.fb.group({
      nombre_ma: ['', [Validators.required,Validators.minLength(2)]],
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
      .subscribe(newpro => { 
        console.log(newpro);
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
