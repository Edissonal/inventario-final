import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UploadequipoService {

  prourl = "http://localhost/inventario/uploadequipo.php/uploequipo";
  constructor(private http:HttpClient) { }

  
  postuplomarca(uploequipo: any) {
    const newpro = uploequipo;
    console.log(uploequipo);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.prourl, newpro, httpOptions);
  }
}
