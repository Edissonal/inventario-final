import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Equipos } from '../interfaces/equipos.interface';

import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {


    equiurl = environment.equiurl;

  constructor(private http: HttpClient) { }
  
  
  postequipo(equipo: Equipos):Observable<Equipos> { 
    const newequi = equipo;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post<Equipos>(this.equiurl, newequi, httpOptions);
    }
     
 
  getequipos():Observable<Equipos> {
    return this.http.get<Equipos>(this.equiurl);
  }

  getequipo(id:number) {
  
    const url = `${this.equiurl + '/' + id}`;
    return this.http.get(url);
  }
  
  putequipo(equipo: Equipos, id: number):Observable<Equipos>  {
    const newequi = equipo;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.equiurl}-update/${id}`;
    return this.http.post<Equipos>(url, newequi, { headers });
  }

  deleuqipo(id: string) {
    return this.http.get(this.equiurl + '-delete/' + id);
  }
}