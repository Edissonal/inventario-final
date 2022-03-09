import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/Rx';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HisconsultasService {


  consprove = "http://inventario-tecsoni.com.co/inventario/index.php/provedor";
  cargaurl = "http://inventario-tecsoni.com.co/inventario/upload-consultas.php/provedor";

  hismanteurl = environment.hismanteurl;

  constructor(private http: HttpClient) { }

  getConsultas(termino:string) 
  {
   return this.http.get(`${this.hismanteurl}hisconsultas/"${termino}"`);
  }

  getpro(id: string) {
   return this.http.get(`${this.hismanteurl}pro/"${id}"`);
  }

  postConsulta(datos: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post(this.hismanteurl+'hisconsultas', datos, httpOptions);
    
  }

  posConsH(datos: string) {
    console.log(datos)
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let url = this.hismanteurl + 'addconh';
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
    let url = this.hismanteurl + 'consultash';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(url, datos, httpOptions);
  }

}
