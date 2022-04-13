import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {


  bodyPut:any = {};
  skills_arr:any = [];

  portfolio_skills:any;
  constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {

    this.portfolioData.getSkill().subscribe(data =>{
      
      
      console.log('Getting Skills data...');
      // seleccionar el index del array de datos
      
      for (let i in data){
        //console.log(data[i].id);
        this.skills_arr.push(data[i]);
        //console.log(this.skills_arr);
      }

      this.portfolio_skills = data[1];
      
      this.bodyPut = this.portfolio_skills;
    }); 
  }

  delSkill(){
    console.log('skill deleted...')
  }

}
