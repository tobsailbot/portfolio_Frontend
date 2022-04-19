import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  hide = false;

  proj_arr:any = [];

  new_proj:any = {
    "img_url":"",
    "link":"",
    "nombre": "",
    "tipo" :""
    };

  portfolio_project:any;
  constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {

    this.portfolioData.getProj().subscribe(data =>{

      console.log('Getting Project data...');
      
      this.proj_arr = [];

      // por cada elemento del array de datos
      // seleccionar el index del array de datos
      for (let i in data){ 
        this.proj_arr.push(data[i]);
        console.log(this.proj_arr.length);
      }

      // si no hay proyectos, se muestra un mensaje
      if (this.proj_arr.length === 0){
        this.hide = true;
        console.log('No Projects...');
      }

      this.portfolio_project = data[0];

    }); 

  }

  onInput(event:any){
    this.new_proj[event.target.name] = event.target.value;
  }

  uploadProjBtn(){
      
      this.portfolioData.postProj(this.new_proj).subscribe(data =>{});
      console.log('Project "' + this.new_proj.nombre + '" uploaded...');
      setTimeout( () => { this.ngOnInit(); console.log('Projects updated..');this.ngOnInit();
      this.hide = false; }, 500 );
  }

  
  delSkillBtn(event:any){
    this.portfolioData.deleteProj(event.target.id).subscribe(data =>{});
    setTimeout( () => { this.ngOnInit(); console.log('Project "' + event.target.name + '" deleted...');}, 300 );
  }

  editVal(){
    this.hide = true;
  }

  cancelEdit(){
    this.hide = false;
  }
}
