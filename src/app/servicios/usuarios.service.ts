import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Usuario } from '../interfaces/usuarios.interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  usurl = environment.usurl;
  
  constructor(private http:HttpClient) { }
  private datos: any | undefined;

  get data():any {
    return {...this.datos!}
  }

  validacion(usuario: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    let url = `${this.usurl}/login`;
    return this.http.post(url, usuario, httpOptions)
      .pipe(
        tap(res => this.datos = res),
        //tap((res:any) => localStorage.setItem('token',res.data.id_usu))
       
      );
  }


  verificacionAutenticacion():Observable<boolean>{
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    let id = localStorage.getItem('token')
    
     const url = `${this.usurl}/usuario-login/${id}`;
     return this.http.get(url)
      .pipe(
        map((respu:any) => {
          this.datos = respu;
          console.log('map', respu);
          return true;
             })
           )
           
  }

  logoout() {
    this.datos = undefined;
    localStorage.removeItem('token');
  }


  postUser(registro:Usuario):Observable<Usuario> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const url = `${this.usurl}/usuario`;
    return this.http.post<Usuario>(url, registro, httpOptions);
  }

  soniguales(campo1: string, campo2: string) {
  
    return (formGroup: AbstractControl): ValidationErrors | null => {
      
      const pass1 = formGroup.get(campo1).value;
      const pass2 = formGroup.get(campo2).value;

      if (pass1 !== pass2) {
        formGroup.get(campo2).setErrors({ noiguales: true });
        return {noiguales:true}
      }
      
      formGroup.get(campo2).setErrors(null);
       return null;
    }


  }

  getusuarios() {
    return this.http.get(this.usurl +'/usuario');
  }

  dellusu(id:string):Observable<Usuario>{
    return this.http.get<Usuario>(this.usurl + '/usuario-delete/' + id);
  }

  getusu(id:string) {
    const url = `${this.usurl + '/usuario/' + id}`;
    return this.http.get(url);
  }

  putlogida(usuario:Usuario,id:string):Observable<Usuario>{

    const  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  // console.log(usuario);
  const url =`${this.usurl}/usuario-update/${id}`;
  return this.http.post<Usuario>(url,usuario,{headers});

  }
  

  putlogi(usuario:any):Observable<Usuario>{

    const  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  const url =`${this.usurl}/usuario-pass`;
  return this.http.post<Usuario>(url,usuario,{headers});

  }
  
  cambiarpass(id: number, pass: string) {
    
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const url = `${this.usurl}/login-update/${id}`;
    return this.http.post(url, pass, { headers });

  }
}
