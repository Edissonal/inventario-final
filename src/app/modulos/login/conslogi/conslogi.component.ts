import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';

import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-conslogi',
  templateUrl: './conslogi.component.html',
  styleUrls: ['./conslogi.component.css']
})
export class ConslogiComponent implements OnInit {

  usuarios: any[] = [];

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

   generadorPass(correo:string){
    var pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var pwdLen = 10;
    var randPassword = Array(pwdLen).fill(pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    console.log(randPassword , correo);
   }
}
