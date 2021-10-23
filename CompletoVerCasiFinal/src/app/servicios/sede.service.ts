import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Sedes } from '../interfaces/sedes.interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

 // sedeurl = "http://localhost/inventario/sede.php/sede";
     sedeurl = environment.sedeurl; 
  
  constructor(private http:HttpClient) { }

  
  postsede(sede: Sedes):Observable<Sedes> {
    const newsede = sede;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Sedes>(this.sedeurl, newsede, httpOptions);

}

getsede():Observable<Sedes> {
  return this.http.get<Sedes>(this.sedeurl);
}

putsede(sede:Sedes ,id:string):Observable<Sedes>  {
  const newsede = sede;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json' 
  });
  const url = `${this.sedeurl}-update/${id}`;
  return this.http.post<Sedes>(url, newsede, {headers});
}

getSedes(id$: string):Observable<Sedes> {
  const url = `${this.sedeurl + '/' + id$}`;
  return this.http.get<Sedes>(url);
}

delsede(id$:string):Observable<Sedes>{
  
  return this.http.get<Sedes>(this.sedeurl+ '-delete/'+ id$)

 }

}
