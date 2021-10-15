import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Ciudad } from '../interfaces/ciudad.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {


  ciurl = "http://localhost/inventario/ciudad.php/ciudad";

  constructor(private http: HttpClient) { 
    
  }

  getCiudad():Observable<Ciudad> {
    return this.http.get<Ciudad>(this.ciurl);
  }

}
