import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';

import { CommonModule } from "@angular/common";
import { Md5 } from 'ts-md5';
import { Params } from '@angular/router';

@Component({
  selector: 'app-conslogi',
  templateUrl: './conslogi.component.html',
  styleUrls: ['./conslogi.component.css']
})
export class ConslogiComponent implements OnInit {

  usuarios: any[] = [];
  estado: string;
  page = 1;
  pageSize = 10;

  constructor(private usuariosService:UsuariosService) { }

  ngOnInit() {
    this.consultausu();
  }

  consultausu() {
    this.usuariosService.getusuarios()
      .subscribe(res => {
        this.usuarios = res['data'];
       // console.log(this.usuarios);

    },error=>{
        console.log(error);
    })
  }


  delusuario(id) {
    this.usuariosService.dellusu(id)
      .subscribe(res => {
        this.usuarios = [];
        this.usuariosService.getusuarios()
          .subscribe(res => {
            this.usuarios = res['data'];
            console.log(this.usuarios);
          }, error => {
            console.log(error);
          });
      });
  }

   generadorPass(correo:string,id:number){
    var pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var pwdLen = 10;
     var randPassword = Array(pwdLen).fill(pwdChars).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
     const md5 = new Md5();
     var encriptFinal:any = md5.appendStr(randPassword).end();
     console.log(randPassword, correo);
     this.estado = "generado";

     const valores:any={
       password_usu: encriptFinal,
       estado: this.estado,
       correo: correo,
       pass:randPassword
     }
     
     this.usuariosService.cambiarpass(id, valores)
       .subscribe(res => {
         console.log(res);
       }, error => {
         console.log(error);
       });
     

   }
  
  
  
}
