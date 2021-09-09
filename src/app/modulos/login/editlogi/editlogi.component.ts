import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { group } from '@angular/animations';
import { Md5 } from 'ts-md5';


@Component({
  selector: 'app-editlogi',
  templateUrl: './editlogi.component.html',
  styleUrls: ['./editlogi.component.css']
})
export class EditlogiComponent implements OnInit {

  //formaform: FormGroup;
  usuario: any;
  id_usu: any;
  showview: boolean = false;
  showview2: boolean = false;
  encrip:any;
  encrip1:any;
  password: any;
  estado: string;



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
            console.log(this.usuario);
            this.showview = true;
        })
      })

       }

       formaform:FormGroup = this.fb.group({
        correo_usu: ['', [Validators.required,Validators.minLength(5)]],
        nombre_usu: ['', [Validators.required, Validators.minLength(5)]],
        password_usu1:['',[Validators.required,Validators.minLength(8)]],
        password_usu2:['',[Validators.required,Validators.minLength(8)]],
       },{
         validators:[this.usuariosService.soniguales('password_usu1','password_usu2')]
       });


  ngOnInit() {
  }


  camposvalidos(campo:string){
    return this.formaform.controls[campo].errors && this.formaform.controls[campo].touched
    
  }


  onSubmit() {
    if(this.formaform.invalid){
      this.formaform.markAllAsTouched();
      return;
    }
    this.usuario = this.saveUsu();
    this.usuariosService.putlogida(this.usuario,this.id_usu)
    .subscribe(res =>{
      console.log(res);
      this.router.navigate(['logi'])
    },error => console.log(error));

  }


  saveUsu() {

    const md5 = new Md5();
    let password_usu1 = this.formaform.get('password_usu1').value;
    this.encrip1 = md5.appendStr(password_usu1).end();
    this.estado = "digitado";
    const saveusu = {
      nombre_usu:this.formaform.get('nombre_usu').value,
      correo_usu: this.formaform.get('correo_usu').value,
      password_usu1: this.encrip1,
      estado_usu: this.estado

    }
    
    return saveusu;
  }


  consultusu(){
    const md5 = new Md5();
    let dato = this.formaform.get('password_usu').value;
    let clave = md5.appendStr(dato).end();

    const pass={
        password_usu : clave,
    }   
    return pass;
  }


  

}
