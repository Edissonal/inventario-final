import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Consultas } from '../interfaces/consultas.interface';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  
  cargaurl = environment.cargaurl;
  consultasurl = environment.consulta;
  potsconsh = environment.potsconsh;

  constructor(private http: HttpClient) { }
  
  getConsultas(termino:string):Observable<Consultas>
  {
   
   return this.http.get<Consultas>(`${this.consultasurl}/consultas/${termino}`);
  }

  getpro(id: string) {
   return this.http.get(`${this.consultasurl}/pro/${id}`);
  }

  postConsulta(datos: Consultas):Observable<Consultas> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let url = `${this.consultasurl}/consultas`;
    return this.http.post<Consultas>(url, datos, httpOptions);
    
  }

  posConsH(datos: string) {
    console.log(datos)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let url = this.potsconsh + 'addconh';
    return this.http.post(url, datos, httpOptions);
    
  }

  delConsulta(id: string):Observable<Consultas> {
   return this.http.get<Consultas>(`${this.consultasurl}/consultas-delete/${id}`);
  }

  getConsulta(id:string) {
    const url = `${this.consultasurl}/consultas-con/${id}`
    return this.http.get(url);
  }

  putconsulta(upconsulta: Consultas, id: string):Observable<Consultas> {

    console.log(upconsulta);
    console.log("datos id" + id);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.consultasurl}/consultas-update/${id}`;
    return this.http.post<Consultas>(url, upconsulta, { headers });
    
  }

  cargaConsul(carga:any) {
    console.log(carga);
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   return this.http.post(this.cargaurl, carga, httpOptions);
 
  }
}
