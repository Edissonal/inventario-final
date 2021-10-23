import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estandar',
  templateUrl: './estandar.component.html',
  styleUrls: ['./estandar.component.css']
})
export class EstandarComponent implements OnInit {

  constructor(private usuariosService: UsuariosService,
              private router:Router) { }
  get datos() {
    return this.usuariosService.data;
  }
  ngOnInit(): void {
  }

  logout() {
    this.usuariosService.logoout();
    this.router.navigate(['logi']);
  }

}
