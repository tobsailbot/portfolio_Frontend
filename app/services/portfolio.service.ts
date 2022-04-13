import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  // Persona API
  persona_url:string="http://localhost:8080/ver/personas";
  persona_url2:string="http://localhost:8080/editar/persona/0";

  // Skills API
  skills_url:string="http://localhost:8080/ver/skill";
  skills_url2:string="http://localhost:8080/editar/skill/0";


  constructor(private http:HttpClient) { }

  // GET
  getPersona():Observable<any>
  {
    return this.http.get(this.persona_url) 
  }

  getSkill():Observable<any>
  {
    return this.http.get(this.skills_url) 
  }




  // PUT  
   putPersona(body:{}):Observable<any>
  {
      return this.http.put<any>(this.persona_url2 , body)
      // return this.http.put<any>(this.url2 + "?nombre=Juan&apellido=Perez" ,null) 
  }
  
}
