import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService {

  // Portfolio API
  api_url:string = "http://localhost:8080/";

  
  constructor(private http:HttpClient) { }


  // GET
  getPersona():Observable<any>
  {
    return this.http.get(this.api_url + "ver/personas");
  }

  getSkill():Observable<any>
  {
    return this.http.get(this.api_url + "ver/skill"); 
  }

  getProj():Observable<any>
  {
    return this.http.get(this.api_url + "ver/project");
  }

  getExp():Observable<any>
  {
    return this.http.get(this.api_url + "ver/exp");
  }

  getEdu():Observable<any>
  {
    return this.http.get(this.api_url + "ver/edu");
  }



  // POST
  postSkill(new_skill:{}):Observable<any>{
    return this.http.post(this.api_url + "new/skill" , new_skill)
  }
  postProj(new_proj:{}):Observable<any>{
    return this.http.post(this.api_url + "new/project" , new_proj)
  }
  postExp(new_exp:{}):Observable<any>{
    return this.http.post(this.api_url + "new/exp" , new_exp)
  }
  postEdu(new_edu:{}):Observable<any>{
    return this.http.post(this.api_url + "new/edu" , new_edu)
  }



  // DEL
  deleteSkill(skill_id:string):Observable<any>
  {
    return this.http.delete(this.api_url + "delete/skill/" + skill_id);
  }

  deleteProj(proj_id:string):Observable<any>
  {
    return this.http.delete(this.api_url + "delete/project/" + proj_id);
  }

  deleteExp(exp_id:string):Observable<any>
  {
    return this.http.delete(this.api_url + "delete/exp/" + exp_id);
  }

  deleteEdu(edu_id:string):Observable<any>
  {
    return this.http.delete(this.api_url + "delete/edu/" + edu_id);
  }


  // PUT  
   putPersona(body:{}):Observable<any>
  {
      return this.http.put<any>(this.api_url + "editar/persona/0" , body);
      // return this.http.put<any>(this.url2 + "?nombre=Juan&apellido=Perez" ,null) 
  }
  
}
