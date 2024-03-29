import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UploadmarcaService {

  uplomarurl = "http://localhost/inventario/uploadmarca.php/uplomarca";
  constructor(private http:HttpClient) { }

  
  postuplomarca(uplomarca: any) {
    const newupmar = uplomarca;
    console.log(uplomarca);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.uplomarurl, newupmar, httpOptions);
  }
}
