import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class HismantenimientoService {

  consultasurl = "http://localhost/inventario/hismantenimiento.php/hismantenimiento";
  potsmanh = "http://localhost/inventario/hismantenimiento.php/";

  constructor(private http: HttpClient) { }

  getConsultas(termino:string) 
  {
   return this.http.get(`${this.consultasurl}/"${termino}"`);
  }

  getvenceman() {
    
    let url = `${this.potsmanh}venman`;
    return this.http.get(url);
  }

  
  cargahistoman(datos: any) {
    let url = this.potsmanh + 'mantenimientosh';
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(url, datos, httpOptions);
  }
}
