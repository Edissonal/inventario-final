import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Consultas } from '../interfaces/consultas.interface';


@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  consultasurl = "http://localhost/inventario/consultas.php/consultas";
  conprourl = "http://localhost/inventario/consultas.php/pro"
  consprove = "http://localhost/inventario/index.php/provedor";
  cargaurl = "http://localhost/inventario/upload-consultas.php/provedor";
  constructor(private http: HttpClient) { }
  
  getConsultas(termino:string):Observable<Consultas>
  {
   
   return this.http.get<Consultas>(`${this.consultasurl}/${termino}`);
  }

  getpro(id: string) {
   return this.http.get(`${this.conprourl}/"${id}"`);
  }

  postConsulta(datos: Consultas):Observable<Consultas> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post<Consultas>(this.consultasurl, datos, httpOptions);
    
  }

  delConsulta(id: string):Observable<Consultas> {
  
   return this.http.get<Consultas>(this.consultasurl + '-delete/' + id);
    
  }

  getConsulta(id:string) {
    const url = `${this.consultasurl}-con/${id}`
    return this.http.get(url);
  }

  putconsulta(upconsulta: Consultas, id: string):Observable<Consultas> {

    console.log(upconsulta);
    console.log("datos id" + id);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.consultasurl}-update/${id}`;
    return this.http.post<Consultas>(url, upconsulta, { headers });
    
  }

  cargaConsul(carga:any) {
    console.log(carga);
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   return this.http.post(this.cargaurl, carga, httpOptions);
 
  }
}
