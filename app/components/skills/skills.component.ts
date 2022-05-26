import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [
    fadeInOnEnterAnimation({ duration: 600 }),
    fadeOutOnLeaveAnimation({ duration: 600 }),
  ]
})

export class SkillsComponent implements OnInit {


  data_ok = false; // verifica si los datos llegan del server 200 = OK

  hide = false; // oculta o muestra el menu de edicion de skills

  skills_arr:any; // variable obtenida del servidor GET request

  new_skill:any = {}; // variable para agregar un nuevo skill

  is_logged:any = false; // verifica si esta logueado en el login component

  uploading:any = false; // si está enviando datos al servidor
  
  constructor(private portfolioData:PortfolioService) {
    this.portfolioData.myMethod$.subscribe((data) => {
      this.is_logged = data;
      }
    );
  }

  ngOnInit(): void {

    this.portfolioData.getSkill().subscribe(data =>{

      if (data.status === 200){ // si la respuesta es correcta
        this.data_ok = true;
      }
      
      console.log('Getting Skills data...');

      this.skills_arr = [];

      for (let i in data.body){ // recorrer el array de datos
        // agregar data GET request a skills_arr
        this.skills_arr.push(data.body[i]);

        // agregar item loading a skills_arr
        this.skills_arr[i].loading = false;
      }

      if (this.skills_arr.length === 0){ // si no hay skills
        console.log('No Skills...');
      }
    }); 
  }


  onSubmit(event:any){

    this.uploading = true;

    const formulario = event.target; // obtener el formulario
     for (let i = 0; i < formulario.length; i++) {
       if(formulario[i].type === "text" || formulario[i].type === "number"){
         this.new_skill[formulario[i].id] = formulario[i].value;
       }   
      }

      // si el porcentaje es mayor a 100, se le asigna el valor 100 
      if (this.new_skill.porcentaje > 100){
        this.new_skill.porcentaje = 100;
      } 
      if (this.new_skill.porcentaje < 1){
        this.new_skill.porcentaje = 1;
      }

      // enviar los datos al servidor
    this.portfolioData.postSkill(this.new_skill).subscribe(data =>{ 
          this.ngOnInit();
          console.log('Skills updated.. ' + data.status);
          this.hide = false;
          this.uploading = false;
    });
  }


  delSkillBtn(i:any){

    // updates button icon to loading
    this.skills_arr[i].loading = true;

    // Delete Skill
    this.portfolioData.deleteSkill(this.skills_arr[i].id).subscribe(data =>{
          this.ngOnInit();
          console.log('Skill deleted...');
    });
  }


  editVal(){
    this.hide = true;
  }

  cancelButton(){
    this.hide = false;
  }



}
