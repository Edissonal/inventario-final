import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Ubicacion } from '../interfaces/ubicacion.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  //prourl = "http://localhost/inventario/ubicacion.php/ubicacion";
  prourl = environment.ubiurl;

  constructor(private http:HttpClient) { }

  postubicacion(ubicacion: Ubicacion):Observable<Ubicacion> {
    const newpro = ubicacion;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Ubicacion>(this.prourl, newpro, httpOptions);
  }

  getubicacion():Observable<Ubicacion>  {
    return this.http.get<Ubicacion>(this.prourl);
  }

  putubicacion(ubicacion:Ubicacion ,id:string):Observable<Ubicacion> {
    const newprove = ubicacion;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    const url = `${this.prourl}-update/${id}`;
    return this.http.post<Ubicacion>(url, newprove, {headers});
  }

  getUbicacionn(id$: string):Observable<Ubicacion> {
    const url = `${this.prourl + '/' + id$}`;
    return this.http.get<Ubicacion>(url);
  }

  delubicacion(id$:string):Observable<Ubicacion>{
  
    return this.http.get<Ubicacion>(this.prourl+ '-delete/'+ id$)
 
   }

}
