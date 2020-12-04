import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  equiurl = "http://localhost/inventario/equipo.php/equipo";

  constructor(private http: HttpClient) { }
  
  
  postequipo(equipo: any) { 
    const newequi = equipo;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post(this.equiurl, newequi, httpOptions);
    }
     
 
  getequipos() {
    return this.http.get(this.equiurl);
  }

  getequipo(id:string) {
  
    const url = `${this.equiurl + '/' + id}`;
    return this.http.get(url);
  }
  
  putequipo(equipo: any, id: string) {
    const newequi = equipo;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.equiurl}-update/${id}`;
    return this.http.post(url, newequi, { headers });
  }

  deleuqipo(id: string) {
    return this.http.get(this.equiurl + '-delete/' + id);
  }
}