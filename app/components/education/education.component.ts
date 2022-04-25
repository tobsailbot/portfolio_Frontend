import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {


  hide = false;

  edu_arr:any = [];

  new_edu:any = {
    "titulo":"",
    "puesto":"",
    "desde":"",
    "hasta":"",
    "descripcion":""
    };

  portfolio_project:any;
  constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {

    this.portfolioData.getEdu().subscribe(data =>{

      console.log('Getting Education data...');
      
      this.edu_arr = [];

      // por cada elemento del array de datos
      // seleccionar el index del array de datos
      for (let i in data){ 
        this.edu_arr.push(data[i]);
      }

      // si no hay Education, se muestra un mensaje
      if (this.edu_arr.length === 0){
        this.hide = true;
        console.log('No Education...');
      }

      this.portfolio_project = data[0];
    });
  }

  onInput(event:any){
    this.new_edu[event.target.name] = event.target.value;
  }


  uploadEduBtn(){
      this.portfolioData.postEdu(this.new_edu).subscribe(data =>{});
      console.log('Education uploaded...');
      setTimeout( () => { this.ngOnInit(); console.log('Education updated..');this.ngOnInit();
      this.hide = false; }, 500 );
  }


  delEduBtn(event:any){
    this.portfolioData.deleteEdu(event.target.id).subscribe(data =>{});
    setTimeout( () => { this.ngOnInit(); console.log('Education "' + event.target.titulo + '" deleted...');}, 300 );
  }



  editVal(){
    this.hide = true;
  }

  cancelEdit(){
    this.hide = false;
  }
  
}