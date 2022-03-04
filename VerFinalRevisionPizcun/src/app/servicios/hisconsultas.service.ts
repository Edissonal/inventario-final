import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class HisconsultasService {

  hismanteurl = "http://localhost/inventario/hisconsultas.php/hisconsultas";
  hmanprourl = "http://localhost/inventario/hisconsultas.php/pro"
  consprove = "http://localhost/inventario/index.php/provedor";
  cargaurl = "http://localhost/inventario/upload-consultas.php/provedor";
  potsconsh = "http://localhost/inventario/hisconsultas.php/";

  constructor(private http: HttpClient) { }

  getConsultas(termino:string) 
  {
   return this.http.get(`${this.hismanteurl}/"${termino}"`);
  }

  getpro(id: string) {
   return this.http.get(`${this.hmanprourl}/"${id}"`);
  }

  postConsulta(datos: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post(this.hismanteurl, datos, httpOptions);
    
  }

  posConsH(datos: string) {
    console.log(datos)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let url = this.potsconsh + 'addconh';
    return this.http.post(url, datos, httpOptions);
    
  }

  getConsulta(id:string) {
    const url = `${this.hismanteurl}-con/${id}`
    return this.http.get(url);
  }

  putconsulta(upconsulta: any, id: string) {

    console.log(upconsulta);
    console.log("datos id" + id);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.hismanteurl}-update/${id}`;
    return this.http.post(url, upconsulta, { headers });
    
  }

  cargaConsul(carga:any) {
    console.log(carga);
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   return this.http.post(this.cargaurl, carga, httpOptions);
 
  }

  cargahistocon(datos: any) {
    console.log(datos)
    let url = this.potsconsh + 'consultash';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(url, datos, httpOptions);
  }

}
