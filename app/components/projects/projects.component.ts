import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  data_ok = false;

  hide = false;

  proj_arr:any = [];

  new_proj:any = {
    "img_url":"",
    "link":"",
    "nombre": "",
    "tipo" :""
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

    this.portfolioData.getProj().subscribe(data =>{

      if (data.status === 200){ // si la respuesta es correcta
        this.data_ok = true;
      }

      console.log('Getting Project data...');
      
      this.proj_arr = [];

      // por cada elemento del array de datos
      // seleccionar el index del array de datos
      for (let i in data.body){ 
        this.proj_arr.push(data.body[i]);
        //console.log(this.proj_arr.length);
      }

      this.portfolio_project = data.body[0];

    }); 

  }

  onInput(event:any){
    this.new_proj[event.target.name] = event.target.value;
  }

  uploadProjBtn(){
      
      this.portfolioData.postProj(this.new_proj).subscribe(data =>{

        if (data.status === 200){ // si el status es OK 200
            this.ngOnInit();
            console.log('Project updated.. ' + data.status);
            this.hide = false;
        }
      });
  }

  
  delProjBtn(event:any){
    this.portfolioData.deleteProj(event.target.id).subscribe(data =>{

      if (data.status === 200){ // si el status es OK 200
        this.ngOnInit();
        console.log('Project deleted...');
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
