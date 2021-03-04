import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  prourl = "http://localhost/inventario/ubicacion.php/ubicacion";

  constructor(private http:HttpClient) { }

  postubicacion(ubicacion: any) {
    const newpro = ubicacion;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.prourl, newpro, httpOptions);
  }

  getubicacion() {
    return this.http.get(this.prourl);
  }

  putubicacion(ubicacion:any ,id:string) {
    const newprove = ubicacion;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    const url = `${this.prourl}-update/${id}`;
    return this.http.post(url, newprove, {headers});
  }

  getUbicacionn(id$: string) {
    const url = `${this.prourl + '/' + id$}`;
    return this.http.get(url);
  }

  delubicacion(id$:string){
  
    return this.http.get(this.prourl+ '-delete/'+ id$)
 
   }

}
