import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "../services/global.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnalizarService {
  public url: string;
  constructor(public _http: HttpClient) {
    this.url =  Global.url;
   }

  ejecutar(codigo: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this._http.post<any>(this.url + 'analizar', codigo, httpOptions);
  }
}
