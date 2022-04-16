import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  hide = false;

  proj_arr:any = [];

  new_proj:any = {
    "img_url":"premierep or",
    "link":"prueba",
    "nombre": "Laburo xd",
    "tipo" :"testeoo"
    };

  portfolio_project:any;
  constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {

    this.portfolioData.getProj().subscribe(data =>{
      
      console.log('Getting Project data...');
      // seleccionar el index del array de datos
      
      this.proj_arr = [];

      for (let i in data){ 
        //console.log(data[i].id);
        this.proj_arr.push(data[i]);
        //console.log(this.skills_arr);
      }

      console.log(this.proj_arr);
      this.portfolio_project = data[0];

    }); 

  }

  
  delSkillBtn(event:any){

    this.portfolioData.deleteProj(event.target.id).subscribe(data =>{});

    //console.log(event.target.id);
    //console.log(event.target.title);
    console.log('Project "' + event.target.value + '" deleted...');
    //this.skills_arr = [];

    setTimeout( () => { this.ngOnInit(); console.log('Skills updated..')/*Your Code*/ }, 200 );
  }


}
