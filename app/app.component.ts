import { Component } from '@angular/core';
import { Educacion } from 'src/educacion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'portfolio_ap';
  

  educacion: Educacion[] = [
    new Educacion('Primaria/Secundaria', 'Mariano Moreno', '2006-2016'),
    new Educacion('Curso CSS', 'Argentina Programa', '2010-2015')
  ]
}
