import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { UsuariosService } from '../../../servicios/usuarios.service';


@Component({
  selector: 'app-regislo',
  templateUrl: './regislo.component.html',
  styleUrls: ['./regislo.component.css']
})
export class RegisloComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private usuariosService:UsuariosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }
  encrip: any;
  registro: any;
  validacion: number;
  mensaje: string;

  formaForm: FormGroup = this.fb.group({
    nombre_usu: ['', [Validators.required]],
    correo_usu: ['', [Validators.required]],
    password_usu: ['', [Validators.required, Validators.minLength(4)]],
    password_usu2: ['', [Validators.required, Validators.minLength(4)]],
    roll_usu: ['', [Validators.required,Validators.minLength(4)]],
    
  },{
    validators:[this.usuariosService.soniguales('password_usu','password_usu2')]
  });

  camposvalidos(campo:string) {

    return this.formaForm.controls[campo].errors && this.formaForm.controls[campo].touched

   }

  ngOnInit() {
  }

  tiempo() {
    setTimeout(() => {
      this.validacion = null;
  },4000)
}

  
  ngsubmit() {
  
    if(this.formaForm.invalid){
      this.formaForm.markAllAsTouched();
      return;
    }
    this.registro = this.savelogin();
    this.usuariosService.postUser(this.registro)
      .subscribe((res:any) => {
        console.log(res.code);
        if (res.code == "400") {
          this.validacion = res.code;
          this.mensaje = res.message;
          this.tiempo();
           
        }
        else {
          this.validacion = res.code;
          this.mensaje = res.message;
          this.tiempo();
        }

      },error=>{console.log(error)});

  }

 
  savelogin() {
    const md5 = new Md5();
    let password_usu = this.formaForm.get('password_usu').value;
    this.encrip = md5.appendStr(password_usu).end();
    
    const login = {
      nombre_usu: this.formaForm.get('nombre_usu').value,
      correo_usu: this.formaForm.get('correo_usu').value,
      password_usu: this.encrip,
      roll_usu:this.formaForm.get('roll_usu').value
    }
    return login;
  }
}

