import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url:string="http://localhost:8080/ver/personas";
  url2:string="http://localhost:8080/editar/persona/0";

  constructor(private http:HttpClient) { }

  // GET
  getData():Observable<any>
  {
    return this.http.get(this.url)
  }

  // PUT service 
   putData():Observable<any>
  {
      return this.http.put<any>(this.url2,{"nombre": "jorge", "apellido": "asdasd" })
      // return this.http.put<any>(this.url2 + "?nombre=Juan&apellido=Perez" ,null) 

  }
  
}
