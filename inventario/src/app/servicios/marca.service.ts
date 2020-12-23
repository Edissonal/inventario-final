import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  prourl = "http://localhost/inventario/marca.php/marca";

  constructor(private http:HttpClient) { }

  postmarca(marca: any) {
    const newpro = marca;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.prourl, newpro, httpOptions);
  }


  getmarca() {
    return this.http.get(this.prourl);
  }

  putmarca(marca:any ,id:string) {
    const newprove = marca;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    const url = `${this.prourl}-update/${id}`;
    return this.http.post(url, newprove, {headers});
  }

  getMarcaa(id$: string) {
    const url = `${this.prourl + '/' + id$}`;
    return this.http.get(url);
  }

  delmarca(id$:string){
  
    return this.http.get(this.prourl+ '-delete/'+ id$)
 
   }

}
