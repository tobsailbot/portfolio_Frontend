import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})


export class ExperienceComponent implements OnInit {

 

  data_ok = false;

  hide = false;

  exp_arr:any = [];

  new_exp:any = {
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


    this.portfolioData.getExp().subscribe(data =>{

      if (data.status === 200){ // si la respuesta es correcta
        this.data_ok = true;
      }

      console.log('Getting Experiencia data...');
      
      this.exp_arr = [];

      // por cada elemento del array de datos
      // seleccionar el index del array de datos
      for (let i in data.body){ 
        this.exp_arr.push(data.body[i]);
      }

      // si no hay experiencias, se muestra un mensaje
      if (this.exp_arr.length === 0){
        this.hide = true;
        console.log('No Experiencia...');
      }

      this.portfolio_project = data.body[0];
    });
  }

  onInput(event:any){
    this.new_exp[event.target.name] = event.target.value;
  }


  uploadExpBtn(){
      this.portfolioData.postExp(this.new_exp).subscribe(data =>{

        if (data.status === 200){ // si el status es OK 200
          this.ngOnInit();
          console.log('Experience updated.. ' + data.status);
          this.hide = false;
      }  
      });
  }


  delExpBtn(event:any){
    this.portfolioData.deleteExp(event.target.id).subscribe(data =>{

      if (data.status === 200){ // si el status es OK 200
        this.ngOnInit();
        console.log('Experience deleted.. ' + data.status);
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
