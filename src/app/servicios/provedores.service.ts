import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Provedor } from '../interfaces/provedor.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvedoresService {

  prourl = "http://localhost/inventario/provedor.php/provedor";
  
  constructor(private http:HttpClient) { }

 
  postprovedor(provedor: Provedor):Observable<Provedor> {
    const newpro = provedor;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Provedor>(this.prourl, newpro, httpOptions);
  }
 
 
  getprovedor():Observable<Provedor> {
    return this.http.get<Provedor>(this.prourl);
  }



  putprovedor(provedor:Provedor ,id:string):Observable<Provedor> {
    const newprove = provedor;
    console.log(newprove);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    const url = `${this.prourl}-update/${id}`;
    return this.http.post<Provedor>(url, newprove, {headers});
  }

  getProveedorr(id$: string):Observable<Provedor> {
    const url = `${this.prourl + '/' + id$}`;
    return this.http.get<Provedor>(url);
  }

  delprovedor(id$:string):Observable<Provedor>{
  
   return this.http.get<Provedor>(this.prourl+ '-delete/'+ id$)

  }

 
}

