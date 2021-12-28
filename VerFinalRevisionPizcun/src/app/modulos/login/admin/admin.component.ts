import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
