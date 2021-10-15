import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { ProvedoresService } from '../../../servicios/provedores.service';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { Provedor } from '../../../interfaces/provedor.interface';
@Component({
  selector: 'app-addprovedor',
  templateUrl: './addprovedor.component.html',
  styleUrls: ['./addprovedor.component.css']
})
export class AddprovedorComponent implements OnInit {

  formaForm: FormGroup;
  proveedor: Provedor;
  validacion: number;
  mensaje: string;

  constructor(private fb: FormBuilder,
              private provedoresService: ProvedoresService,
              private usuariosService: UsuariosService,
              private router:Router) {
                this.crearFormulario();           
  }
  tiempo() {
    setTimeout(() => {
      this.validacion = null;
    }, 5000);
  }

  ngOnInit() {}
  
  get nombreNovalido() {
    return this.formaForm.get('nombre_pro').invalid && this.formaForm.get('nombre_pro').touched;
  }

  get nitNovalido() {
    return this.formaForm.get('nit_pro').invalid && this.formaForm.get('nit_pro').touched;
  }
  crearFormulario() { 

    this.formaForm = this.fb.group({
    nombre_pro: ['', [Validators.required,Validators.minLength(5)]],
    nit_pro: ['', [Validators.required,Validators.minLength(9)]]
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
      .subscribe(res => { 
        
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

      }, error => console.log(<any>error));
      this.formaForm.reset();
  }

  saveProvedor() {
    const saveProvedor = {
      nombre_pro: this.formaForm.get('nombre_pro').value,
      nit_pro: this.formaForm.get('nit_pro').value,
    }
    return saveProvedor;
  }
}
