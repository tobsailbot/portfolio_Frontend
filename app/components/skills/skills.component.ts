import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation,rotateAnimation,} from 'angular-animations';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [
    fadeInOnEnterAnimation({ duration: 600 }),
    fadeOutOnLeaveAnimation({ duration: 600 }),
    rotateAnimation({ duration: 10000, degrees: 360*10}),
  ]
})

export class SkillsComponent implements OnInit {



  data_ok = false;

  hide = false;

  skills_arr:any;

  new_skill:any = {};

  is_logged:any = false;

  loading = false;
  
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
    });
  }


  delSkillBtn(i:any){

    // updates button icon to loading
    this.skills_arr[i].loading = true;

    // Delete Skill
    this.portfolioData.deleteSkill(this.skills_arr[i].id).subscribe(data =>{
          this.ngOnInit();
          console.log('Skill deleted...');
          this.loading = false;
    });
  }

  animState = false;

  animDone() {
    this.animState = !this.animState;
  }

  editVal(){
    this.hide = true;
  }

  cancelButton(){
    this.hide = false;
  }



}
