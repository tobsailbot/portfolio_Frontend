import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})

export class ExperienceComponent implements OnInit {

  hide = false;

  exp_arr:any = [];

  new_exp:any = {
    "img_url":"",
    "link":"",
    "nombre": "",
    "tipo" :""
    };

  portfolio_project:any;
  constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {

    this.portfolioData.getExp().subscribe(data =>{

      console.log('Getting Experience data...');
      
      this.exp_arr = [];

      // por cada elemento del array de datos
      // seleccionar el index del array de datos
      for (let i in data){ 
        this.exp_arr.push(data[i]);
      }

      // si no hay experiencias, se muestra un mensaje
      if (this.exp_arr.length === 0){
        this.hide = true;
        console.log('No Experiencia...');
      }

      this.portfolio_project = data[0];
    });
  }

  onInput(event:any){
    this.new_exp[event.target.name] = event.target.value;
  }


  uploadExpBtn(){
      this.portfolioData.postExp(this.new_exp).subscribe(data =>{});
      console.log('Experience "' + this.new_exp.nombre + '" uploaded...');
      setTimeout( () => { this.ngOnInit(); console.log('Experience updated..');this.ngOnInit();
      this.hide = false; }, 500 );
  }


  delExpBtn(event:any){
    this.portfolioData.deleteExp(event.target.id).subscribe(data =>{});
    setTimeout( () => { this.ngOnInit(); console.log('Experience "' + event.target.name + '" deleted...');}, 300 );
  }



  editVal(){
    this.hide = true;
  }

  cancelEdit(){
    this.hide = false;
  }
}
