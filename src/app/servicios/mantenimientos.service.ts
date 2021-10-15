
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mantenimientos } from '../interfaces/mantenimiento.interface ';
import { HistoMantenimientos } from '../interfaces/histomantenimiento.interface ';



@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  
  manurl = "http://localhost/inventario/mantenimientos.php/mantenimientos";

  mantourl = "http://localhost/inventario/mantenimientos.php/consultasman";

  seriurl = "http://localhost/inventario/mantenimientos.php/consulman";

  potsmanh = "http://localhost/inventario/hismantenimiento.php/";
  potsman = "http://localhost/inventario/mantenimientos.php/";
  mantu = "http://localhost/inventario/mantenimientos.php/mantenimientos-te";


  constructor(private http: HttpClient) { }


  getMantenimiento(termino: string) {
    return this.http.get(`${this.manurl}/"${termino}"`);
    
  }

  carmantenimiento(datos: any) {
   
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.manurl, datos, httpOptions);
    
  }
  
  getManteni(termino:string){

    return this.http.get(`${this.mantourl}/${termino}`);
  }

  getserial(termino:string) {
    
    return this.http.get(`${this.seriurl}/"${termino}"`);
  }

  postMante(datos: Mantenimientos):Observable<Mantenimientos> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let url = this.potsman + 'addman';
    return this.http.post<Mantenimientos>(url, datos, httpOptions);

    
  }

  posManteH(datos: HistoMantenimientos):Observable<HistoMantenimientos> {
    console.log(datos)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let url = this.potsmanh + 'addmanh';
    return this.http.post<HistoMantenimientos>(url, datos, httpOptions); 
  }

  deleteMan(id:string):Observable<Mantenimientos> {
    return this.http.get<Mantenimientos>(this.manurl + '-delete/' + id);
  }


  getMa(id:string):Observable<Mantenimientos> {
    const url = `${this.manurl}-te/${id}`
    return this.http.get<Mantenimientos>(url);
  }

  putman(mantenimiento: Mantenimientos, id: string):Observable<Mantenimientos> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.manurl}-update/${id}`;
    return this.http.post<Mantenimientos>(url, mantenimiento, { headers });
  }
}


