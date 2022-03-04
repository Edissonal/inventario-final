import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/operators/map';
import { Observable } from "rxjs/observable";
import { Provedor } from "../models/provedores";
import { GLOBAL} from "./global";

@Injectable({
  providedIn: 'root'
})
export class Provedores1Service {
  public url: string;
  constructor(
    public http:Http) {
    this.url = GLOBAL.url;
  }

  getProvedor() {
    return this.http.get(this.url + 'provedor')
      .map(res => res.json());
}

   }

