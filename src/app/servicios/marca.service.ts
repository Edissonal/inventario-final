import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Marcas } from '../interfaces/marcas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  prourl = "http://localhost/inventario/marca.php/marca";

  constructor(private http:HttpClient) { }

  postmarca(marca: Marcas):Observable<Marcas> {
    const newpro = marca;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Marcas>(this.prourl, newpro, httpOptions);
  }


  getmarca():Observable<Marcas> {
    return this.http.get<Marcas>(this.prourl);
  }

  putmarca(marca:Marcas ,id:string):Observable<Marcas> {
    const newprove = marca;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    const url = `${this.prourl}-update/${id}`;
    return this.http.post<Marcas>(url, newprove, {headers});
  }

  getMarcaa(id$: string):Observable<Marcas> {
    const url = `${this.prourl + '/' + id$}`;
    return this.http.get<Marcas>(url);
  }

  delmarca(id$:string):Observable<Marcas>{
  
    return this.http.get<Marcas>(this.prourl+ '-delete/'+ id$)
 
   }

}
