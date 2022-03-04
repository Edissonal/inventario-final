import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProvedoresService {

  prourl = "http://localhost/inventario/index.php/provedor";
   
  constructor(private http: HttpClient) {
   }

  
  


  postprovedor(provedor: any) {
    const newpro = provedor;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.prourl, newpro, httpOptions);
  }


  getprovedor() {
    return this.http.get(this.prourl);
  }

  delprovedor(id$: string) {
    return this.http.get(this.prourl + '-delete/' + id$);
  }

  getprovedorr(id$: string) {
    const url = `${this.prourl + '/' + id$}`;
    return this.http.get(url);

  }

  putprovedor(provedor: any, id: string) {
    
    const newprove = JSON.stringify(provedor);
    console.log(newprove)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    const url = `${this.prourl}-update/${id}`;
    return this.http.post(url, newprove, {headers});
  }
}
