import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  prourl = "http://localhost/inventario/sede.php/sede";

  constructor(private http:HttpClient) { }

  postsede(sede: any) {
    const newpro = sede;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.prourl, newpro, httpOptions);

}

getmarca() {
  return this.http.get(this.prourl);
}

putsede(sede:any ,id:string) {
  const newprove = sede;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json' 
  });
  const url = `${this.prourl}-update/${id}`;
  return this.http.post(url, newprove, {headers});
}

getSedes(id$: string) {
  const url = `${this.prourl + '/' + id$}`;
  return this.http.get(url);
}

delsede(id$:string){
  
  return this.http.get(this.prourl+ '-delete/'+ id$)

 }

}
