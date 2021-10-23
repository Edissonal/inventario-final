import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UploadubicacionService {

  prourl = "http://localhost/inventario/uploadubicacion.php/uploubicacion";
  constructor(private http:HttpClient) { }

  
  postuploubicacion(uploubicacion: any) {
    const newpro = uploubicacion;
    console.log(uploubicacion);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.prourl, newpro, httpOptions);
  }
}
