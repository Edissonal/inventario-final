import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { ProvedoresService } from '../../../servicios/provedores.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-addprovedor',
  templateUrl: './addprovedor.component.html',
  styleUrls: ['./addprovedor.component.css']
})
export class AddprovedorComponent implements OnInit {

  formaForm: FormGroup;
  proveedor: any;
  constructor(private fb: FormBuilder,
              private provedoresService: ProvedoresService) { 
                this.crearFormulario();           
  }

  ngOnInit() {}
  
  get nombreNovalido() {
    return this.formaForm.get('nombre_pro').invalid && this.formaForm.get('nombre_pro').touched;
  }
  get direccionNovalido() {
    return this.formaForm.get('direccion_pro').invalid && this.formaForm.get('direccion_pro').touched;
  }

  get nitNovalido() {
    return this.formaForm.get('nit_pro').invalid && this.formaForm.get('nit_pro').touched;
  }
  crearFormulario() { 

    this.formaForm = this.fb.group({
      nombre_pro: ['', [Validators.required,Validators.minLength(5)]],
      direccion_pro: ['', [Validators.required,Validators.minLength(10)]],
    nit_pro: ['', [Validators.required,Validators.minLength(10)]]
     });
  }
  onSubmit() {
    if (this.formaForm.invalid) {
      
      Object.values(this.formaForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.proveedor = this.saveProvedor();
    this.provedoresService.postprovedor(this.proveedor)
      .subscribe(newpro => { 
        console.log(newpro);
      }, error => console.log(<any>error));
      this.formaForm.reset();
  }

  saveProvedor() {
    const saveProvedor = {
      nombre_pro: this.formaForm.get('nombre_pro').value,
      direccion_pro: this.formaForm.get('direccion_pro').value,
      nit_pro: this.formaForm.get('nit_pro').value,
    }
    return saveProvedor;
  }
}
