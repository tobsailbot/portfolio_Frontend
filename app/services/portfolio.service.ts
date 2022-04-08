import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url:string="http://localhost:8080/ver/personas";
  url2:string="http://localhost:8080/editar/persona/0";
  body = {
  "id":1,
  "nombre": "fonsoo Pilarcheee",
  "profile_image_url": "https://pbs.twimg.com/profile_images/1079098450118782464/Q-x_5qQ1_400x400.jpg",
  "redes_sociales": "",
  "titulo": "profesional dumbass",
  "sobre_mi": "esto es un texto de prueba de la descipcion",
  "edad": "25",
  "email": "test@mail.test",
  "telefono": "123456789",
  "ubicacion": "Argentina",
  "idioma": "Español"
};

  constructor(private http:HttpClient) { }

  // GET
  getData():Observable<any>
  {
    return this.http.get(this.url)
  }

  // PUT  
   putData(body:{}):Observable<any>
  {
      return this.http.put<any>(this.url2 , body)
      // return this.http.put<any>(this.url2 + "?nombre=Juan&apellido=Perez" ,null) 
  }
  
}
