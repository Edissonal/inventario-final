import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuarios: any;
  encrip: any;
  validacion: boolean = false;
  mensaje: string;
  constructor(private fb: FormBuilder,
              private usuariosService: UsuariosService,
              private router:Router ) {

   }

  ngOnInit() {
  }

  tiempo() {
    setTimeout(() => {
      this.validacion = false;
    }, 3000);

  }
  
  formaForm: FormGroup = this.fb.group({
    correo_usu: ['', [Validators.required,Validators.email]],
    password_usu:['',[Validators.required,Validators.minLength(4)]],
  });


  camposvalidos(campo:string) {
  return this.formaForm.controls[campo].errors && this.formaForm.controls[campo].touched  

  }
  
  ngsubmit() {

    if (this.formaForm.invalid) {
      
      this.formaForm.markAllAsTouched();
      return;
    }
    this.usuarios = this.savelogin();
    this.usuariosService.validacion(this.usuarios)
      .subscribe((res:any) => {
          
        if (res.code ==200) {
          console.log(res);
          localStorage.setItem('token', res.data.id_usu);

          if (res.data.esta_usu == 'generado') {
            
            this.router.navigate([`/editar/edita/${res.data.id_usu}`]);
          }

          if (res.data.esta_usu == 'digitado') {
            
            if (res.data.rol_usu == 'administrador') {
            
              this.router.navigate(['auth']);
            }
  
            if (res.data.rol_usu == 'usuario') {
            
              this.router.navigate(['usu']);
            }
          }
        }
        else {
         // return;
          console.log('Login incorrecto');
          this.mensaje = 'Login incorrecto';
          this.validacion = true;
          this.tiempo();

        }
      });
    
  }

  savelogin() {
    const md5 = new Md5();
    let password_usu = this.formaForm.get('password_usu').value;
    this.encrip = md5.appendStr(password_usu).end();

    const login = {
      correo_usu: this.formaForm.get('correo_usu').value,
      password_usu: this.encrip,
    }
    return login;
  }
}
