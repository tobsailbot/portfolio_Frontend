import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {

  data_ok = false;

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

      if (data.status === 200){ // si la respuesta es correcta
        this.data_ok = true;
      }
      
      console.log('Getting Skills data...');

      this.skills_arr = [];

      for (let i in data.body){ // recorrer el array de datos
        this.skills_arr.push(data.body[i]); 
      }

      if (this.skills_arr.length === 0){ // si no hay skills
        this.hide = true;
        console.log('No Skills...');
      }

      //console.log(this.skills_arr);
      this.portfolio_skills = data.body[0];
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
    this.portfolioData.postSkill(this.new_skill).subscribe(data =>{

      if (data.status === 200){ // si el status es OK 200
          this.ngOnInit();
          console.log('Skills updated.. ' + data.status);
          this.hide = false;
      }
    });
  }


  delSkillBtn(event:any){
    this.portfolioData.deleteSkill(event.target.id).subscribe(data =>{
        
        if (data.status === 200){ // si el status es OK 200
          this.ngOnInit();
          console.log('Skill deleted...');
        }
    });
  }

  editVal(){
    this.hide = true;
  }

  cancelButton(){
    this.hide = false;
  }




}
