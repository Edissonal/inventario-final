import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  consultasurl = "http://localhost/inventario/consultas.php/consultas";
  conprourl = "http://localhost/inventario/consultas.php/pro"
  consprove = "http://localhost/inventario/index.php/provedor";
  constructor(private http: HttpClient) { }
  
  getConsultas(termino:string) 
  {
   return this.http.get(`${this.consultasurl}/"${termino}"`);
  }

  getpro(id: string) {
   return this.http.get(`${this.conprourl}/"${id}"`);
  }

  postConsulta(datos: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post(this.consultasurl, datos, httpOptions);
    
  }

  delConsulta(id: string) {
  
   return this.http.get(this.consultasurl + '-delete/' + id);
    
  }

  getConsulta(id:string) {
    const url = `${this.consultasurl}-con/${id}`
    return this.http.get(url);
  }

  putconsulta(upconsulta: any, id: string) {

    console.log(upconsulta);
    console.log("datos id" + id);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.consultasurl}-update/${id}`;
    return this.http.post(url, upconsulta, { headers });
    
  }
}
