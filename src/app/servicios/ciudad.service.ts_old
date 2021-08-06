import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {


  ciurl = "http://localhost/inventario/ciudad.php/ciudad";

  constructor(private http: HttpClient) { 
    
  }

  getCiudad() {
    return this.http.get(this.ciurl);
  }

}
