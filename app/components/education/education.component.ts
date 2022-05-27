import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  animations: [
    fadeInOnEnterAnimation({ duration: 600 }),
    fadeOutOnLeaveAnimation({ duration: 600 }),
  ]
})
export class EducationComponent implements OnInit {

  data_ok = false;
  
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
  
  is_logged:any = false;
  
  constructor(private portfolioData:PortfolioService) {
    this.portfolioData.myMethod$.subscribe((data) => {
      this.is_logged = data;
    }
    );
  }


  ngOnInit(): void {

    this.portfolioData.getEdu().subscribe(data =>{

      if (data.status === 200){ // si la respuesta es correcta
        this.data_ok = true;
      }

      console.log('Getting Education data...');
      
      this.edu_arr = [];

      // por cada elemento del array de datos
      // seleccionar el index del array de datos
      for (let i in data.body){ 
        this.edu_arr.push(data.body[i]);
      }

      this.portfolio_project = data.body[0];
    });
  }

  onInput(event:any){
    this.new_edu[event.target.name] = event.target.value;
  }


  uploadEduBtn(){

    this.portfolioData.postEdu(this.new_edu).subscribe(data =>{

      if (data.status === 200){ // si el status es OK 200
          this.ngOnInit();
          console.log('Education updated.. ' + data.status);
          this.hide = false;
      }  
    });
  }	


  delEduBtn(event:any){
    this.portfolioData.deleteEdu(event.target.id).subscribe(data =>{

      if (data.status === 200){ // si el status es OK 200
        this.ngOnInit();
        console.log('Education deleted...');
      }
    });
  }



  editVal(){
    this.hide = true;
  }

  cancelEdit(){
    this.hide = false;
  }
  
}