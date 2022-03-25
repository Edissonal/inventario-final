import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuarios.interfaces';



@Component({
  selector: 'app-editusu',
  templateUrl: './editusu.component.html',
  styleUrls: ['./editusu.component.css']
})
export class EditusuComponent implements OnInit {

  showview: boolean = false;
  id_usu: string;
  usuario: Usuario;

  roles: any[] = [
    { 'rol_usu': 'administrador' },
    { 'rol_usu': 'usuario'},
  ];


  constructor(private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
              
    this.activatedRoute.params
      .subscribe(para => {
        this.id_usu = para['id'];
        this.usuariosService.getusu(this.id_usu)
          .subscribe(res => {
            this.usuario = res['data'];
            this.showview = true;
          })
      });

  }
  ngOnInit(): void {
  }

  formaform: FormGroup = this.fb.group({
    nombre_usu: ['', [Validators.required, Validators.minLength(5)]],
    correo_usu: ['', [Validators.required, Validators.minLength(5)]],
    rol_usu:['',[Validators.required,Validators.minLength(5)]],

  })

 
  camposvalidos(campo:string){
    return this.formaform.controls[campo].errors && this.formaform.controls[campo].touched
    
  }


  onSubmit() {
    if (this.formaform.invalid) {

      Object.values(this.formaform.controls).forEach(control => {
        control.markAllAsTouched();
      });

      return;
    } else {
      
      this.usuario = this.saveUsu();
      this.usuariosService.putusu(this.usuario, this.id_usu)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/auth/constlogi']);
        }, error => { console.log(<any>error) });
    }
   
  }






  saveUsu() {
    const saveUsu = {
      nombre_usu: this.formaform.get('nombre_usu').value,
      correo_usu: this.formaform.get('correo_usu').value,
      rol_usu : this.formaform.get('rol_usu').value,
    }

    return saveUsu;
  }
  


}
