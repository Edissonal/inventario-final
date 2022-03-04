import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  
  prourl = "http://localhost/inventario/upload.php/provedor";
  constructor(private http:HttpClient) { }

  
  postprovedor(provedor: any) {
    const newpro = provedor;
    //console.log(provedor);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.prourl, newpro, httpOptions);
  }
}
