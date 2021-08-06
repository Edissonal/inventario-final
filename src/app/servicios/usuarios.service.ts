import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usurl = 'http://localhost/inventario/usuarios.php/login';
  usurlo = 'http://localhost/inventario/usuarios.php/usuario-login';
  urluser = 'http://localhost/inventario/usuarios.php/usuario';
  
  constructor(private http:HttpClient) { }
  private datos: any | undefined;

  get data():any {
    return {...this.datos!}
  }

  validacion(usuario: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post(this.usurl, usuario, httpOptions)
      .pipe(
        tap(res => this.datos = res),
        //tap((res:any) => localStorage.setItem('token',res.data.id_usu))
       
      );
  }


  verificacionAutenticacion():Observable<boolean>{
    if (!localStorage.getItem('token')) {
      return of(false);
    }
     let id= localStorage.getItem('token')
     const url = `${this.usurlo + '/' + id}`;
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


  postUser(registro:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.urluser, registro, httpOptions);
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
    return this.http.get(this.urluser);
  }

  dellusu(id:string){
    return this.http.get(this.urluser + '-delete/' + id);

  }

  getusu(id:string) {
    const url = `${this.urluser + '/' + id}`;
    return this.http.get(url);
  }

  putlogida(usuario:any,id:string){

    const  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })
   console.log(usuario);
  const url =`${this.urluser}-update/${id}`;
  return this.http.post(url,usuario,{headers});

  }
  

  putlogi(usuario:any){

    const  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  const url =`${this.urluser}-pass`;
  return this.http.post(url,usuario,{headers});

  }

}
