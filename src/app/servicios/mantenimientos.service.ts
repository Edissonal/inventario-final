
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  
  manurl = "http://localhost/inventario/mantenimientos.php/mantenimientos";

  mantourl = "http://localhost/inventario/mantenimientos.php/consultasman";

  seriurl = "http://localhost/inventario/mantenimientos.php/consulman";

  potsman = "http://localhost/inventario/mantenimientos.php/addman";

  constructor(private http: HttpClient) { }


  getMantenimiento(termino: string) {
    return this.http.get(`${this.manurl}/"${termino}"`);
    
  }

  carmantenimiento(datos: any) {
   
    console.log(datos);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.manurl, datos, httpOptions);
    
  }
  
  getManteni(termino:string){

    return this.http.get(`${this.mantourl}/"${termino}"`);
  }

  getserial(termino:string) {
    
    return this.http.get(`${this.seriurl}/"${termino}"`);
  }

  postMante(datos: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.potsman, datos, httpOptions);
    
  }

}
