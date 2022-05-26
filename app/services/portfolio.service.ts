import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService {


  // Portfolio API
  //api_url:string = "https://heroku-argentina.herokuapp.com/";
  api_url:string = "http://localhost:8080/";

  // Login status
  is_logged:any;

  constructor(private http:HttpClient) {
    this.myMethod$ = this.myMethodSubject.asObservable();
   }


  // GET
  getPersona():Observable<any>
  {
    return this.http.get(this.api_url + "ver/personas", { observe: 'response' });
  }

  getSkill():Observable<any>
  {
    return this.http.get(this.api_url + "ver/skill", { observe: 'response' }); 
  }

  getProj():Observable<any>
  {
    return this.http.get(this.api_url + "ver/project", { observe: 'response' });
  }

  getExp():Observable<any>
  {
    return this.http.get(this.api_url + "ver/exp", { observe: 'response' });
  }

  getEdu():Observable<any>
  {
    return this.http.get(this.api_url + "ver/edu", { observe: 'response' });
  }

  getLogin():Observable<any>
  {
    return this.http.get(this.api_url + "ver/login", { observe: 'response' });
  }



  // POST
  postSkill(new_skill:{}):Observable<any>{
    return this.http.post(this.api_url + "new/skill" , new_skill, { observe: 'response' })
  }
  postProj(new_proj:{}):Observable<any>{
    return this.http.post(this.api_url + "new/project" , new_proj, { observe: 'response' })
  }
  postExp(new_exp:{}):Observable<any>{
    return this.http.post(this.api_url + "new/exp" , new_exp, { observe: 'response' })
  }
  postEdu(new_edu:{}):Observable<any>{
    return this.http.post(this.api_url + "new/edu" , new_edu, { observe: 'response' })
  }



  // DEL
  deleteSkill(skill_id:string):Observable<any>
  {
    return this.http.delete(this.api_url + "delete/skill/" + skill_id, { observe: 'response' });
  }

  deleteProj(proj_id:string):Observable<any>
  {
    return this.http.delete(this.api_url + "delete/project/" + proj_id, { observe: 'response' });
  }

  deleteExp(exp_id:string):Observable<any>
  {
    return this.http.delete(this.api_url + "delete/exp/" + exp_id, { observe: 'response' });
  }

  deleteEdu(edu_id:string):Observable<any>
  {
    return this.http.delete(this.api_url + "delete/edu/" + edu_id, { observe: 'response' });
  }


  // PUT  
   putPersona(body:{}):Observable<any>
  {
      return this.http.put<any>(this.api_url + "editar/persona/0" , body, { observe: 'response' });
  }



  // obtener datos desde el login component
  myMethod$: Observable<any>;
  private myMethodSubject = new BehaviorSubject<any>("");

  myMethod(data:any) {
      this.myMethodSubject.next(data);
  }

  
}
