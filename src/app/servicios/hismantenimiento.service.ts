import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/Rx';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HismantenimientoService {


  //potsmanh = "http://localhost/inventario/hismantenimiento.php/";

  consultasurl = environment.consultasurl;

  constructor(private http: HttpClient) { }

  getConsultas(termino:string) 
  {
   return this.http.get(`${this.consultasurl}hismantenimiento/${termino}`);
  }

  getvenceman() {
    
    let url = `${this.consultasurl}venman`;
    return this.http.get(url);
  }

  
  cargahistoman(datos: any) {
    let url = this.consultasurl + 'mantenimientosh';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(url, datos, httpOptions);
  }
}
