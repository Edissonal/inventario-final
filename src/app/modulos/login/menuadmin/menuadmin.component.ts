import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../servicios/usuarios.service';


@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit {

  constructor(private usuariosService: UsuariosService,
    private router: Router) { }

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
