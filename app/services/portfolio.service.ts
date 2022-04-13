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
  skills_url2:string="http://localhost:8080/new/skill";
  skills_url3:string="http://localhost:8080/delete/skill";

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

  // DEL
  deleteSkill(skill_id:string):Observable<any>
  {
    return this.http.delete(this.skills_url3 + "/" + skill_id)
  }

  // POST
  postSkill(new_skill:{}):Observable<any>{
    return this.http.post(this.skills_url2, new_skill)
  }


  // PUT  
   putPersona(body:{}):Observable<any>
  {
      return this.http.put<any>(this.persona_url2 , body)
      // return this.http.put<any>(this.url2 + "?nombre=Juan&apellido=Perez" ,null) 
  }
  
}
