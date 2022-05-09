import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {

  hide = false;

  skills_arr:any = [];

  porcent:number = 0;

  new_skill:any = {
    "habilidad": "habilidad",
    "porcentaje": 1
  };

  portfolio_skills:any;
  constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {

    this.portfolioData.getSkill().subscribe(data =>{
      
      console.log('Getting Skills data...');
      // seleccionar el index del array de datos
      
      this.skills_arr = [];

      for (let i in data){ 
        //console.log(data[i].id);
        this.skills_arr.push(data[i]);
        //console.log(this.skills_arr);
      }

      //console.log(this.skills_arr);
      this.portfolio_skills = data[0];

    }); 
  }

  inputHabilidad(event:any){
    console.log(event.target.value);
    //console.log(event.target.name);
    this.new_skill.habilidad = event.target.value;
    //console.log(this.new_skill);
  }

  inputPorcentaje(event:any){
    
     this.porcent = event.target.value;
    
     if (this.porcent > 100){
      this.porcent = 100;
     }
     if (this.porcent < 1){
      this.porcent = 1;
     }
     else{
       this.new_skill.porcentaje = this.porcent;
      }
     console.log(this.porcent);
  }
  

  addSkillBtn(event:any){

    //console.log(this.new_skill);
    this.portfolioData.postSkill(this.new_skill).subscribe(data =>{});
    setTimeout( () => { this.ngOnInit(); console.log('Skill added..');this.hide = false }, 200 );
  }


  delSkillBtn(event:any){

    this.portfolioData.deleteSkill(event.target.id).subscribe(data =>{});

    console.log(event.target.id);
    console.log(event.target.title);
    console.log('Skill "' + event.target.value + '" deleted...');
    this.skills_arr = [];

    setTimeout( () => { this.ngOnInit(); console.log('Skills updated..') }, 200 );

  }

  editVal(){
    this.hide = true;
  }

  cancelButton(){
    this.hide = false;
  }

}
