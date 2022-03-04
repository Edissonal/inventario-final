import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../../servicios/usuarios.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuariosService: UsuariosService,
              private router:Router) {
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
     
    return this.usuariosService.verificacionAutenticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
                 this.router.navigate(['logi'])
               }
             })
           )
  
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    
      return this.usuariosService.verificacionAutenticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
                 this.router.navigate(['logi'])
               }
             })
           )

  }
}
