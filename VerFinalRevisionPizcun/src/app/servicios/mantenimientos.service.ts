
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mantenimientos } from '../interfaces/mantenimiento.interface ';
import { HistoMantenimientos } from '../interfaces/histomantenimiento.interface ';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  

  manurl = environment.mante;
  potsmanh = environment.potsmanh;

  constructor(private http: HttpClient) { }


  getMantenimiento(termino: string) {
    return this.http.get(`${this.manurl}/mantenimientos/"${termino}"`);
    
  }

  carmantenimiento(datos: any) {
   
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(`${this.manurl}/mantenimientos`, datos, httpOptions);
    
  }
  
  getManteni(termino:string){

    return this.http.get(`${this.manurl}/consultasman/${termino}`);
  }

  getserial(termino:string) {
    
    return this.http.get(`${this.manurl}/consulman/"${termino}"`);
  }

  postMante(datos: Mantenimientos):Observable<Mantenimientos> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let url = this.manurl + '/addman';
    return this.http.post<Mantenimientos>(url, datos, httpOptions);

    
  }

  posManteH(datos: HistoMantenimientos):Observable<HistoMantenimientos> {
    console.log(datos)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let url = this.potsmanh + '/addmanh';
    return this.http.post<HistoMantenimientos>(url, datos, httpOptions); 
  }

  deleteMan(id:string):Observable<Mantenimientos> {
    return this.http.get<Mantenimientos>(`${this.manurl}/mantenimientos-delete/${id}`);
  
  }


  getMa(id:string):Observable<Mantenimientos> {
    const url = `${this.manurl}/mantenimientos-te/${id}`
    return this.http.get<Mantenimientos>(url);
  }

  putman(mantenimiento: Mantenimientos, id: string):Observable<Mantenimientos> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.manurl}/mantenimientos-update/${id}`;
    return this.http.post<Mantenimientos>(url, mantenimiento, { headers });
  }
}


