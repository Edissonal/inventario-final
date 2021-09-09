import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class ProvedoresService {

  prourl = "http://localhost/inventario/provedor.php/provedor";
  
  constructor(private http:HttpClient) { }

 
  postprovedor(provedor: any) {
    const newpro = provedor;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.prourl, newpro, httpOptions);
  }
 
 
  getprovedor() {
    return this.http.get(this.prourl);
  }



  putprovedor(provedor:any ,id:string) {
    const newprove = provedor;
    console.log(newprove);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    const url = `${this.prourl}-update/${id}`;
    return this.http.post(url, newprove, {headers});
  }

  getProveedorr(id$: string) {
    const url = `${this.prourl + '/' + id$}`;
    return this.http.get(url);
  }

  delprovedor(id$:string){
  
   return this.http.get(this.prourl+ '-delete/'+ id$)

  }

 
}

