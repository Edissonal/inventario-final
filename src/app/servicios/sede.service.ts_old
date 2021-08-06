import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  sedeurl = "http://localhost/inventario/sede.php/sede";

  constructor(private http:HttpClient) { }

  
  postsede(sede: any) {
    const newsede = sede;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.sedeurl, newsede, httpOptions);

}

getsede() {
  return this.http.get(this.sedeurl);
}

putsede(sede:any ,id:string) {
  const newsede = sede;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json' 
  });
  const url = `${this.sedeurl}-update/${id}`;
  return this.http.post(url, newsede, {headers});
}

getSedes(id$: string) {
  const url = `${this.sedeurl + '/' + id$}`;
  return this.http.get(url);
}

delsede(id$:string){
  
  return this.http.get(this.sedeurl+ '-delete/'+ id$)

 }

}
