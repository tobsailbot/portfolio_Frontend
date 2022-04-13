import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  hide = false;


  bodyPut:any = {};

  portfolio_persona:any;
  constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {

    this.portfolioData.getPersona().subscribe(data =>{
      
      
      console.log('Getting Persona data...');
      // seleccionar el index del array de datos
      this.portfolio_persona = data[0];
      
      this.bodyPut = this.portfolio_persona;
    });
  }

  
  onKey(event:any): void{
    
    //console.log(event.target.value);
    //console.log(event.target.name);
    this.bodyPut= this.portfolio_persona;
    const key = event.target.name as string;
    this.bodyPut[key as keyof typeof this.bodyPut] = event.target.value;
    //console.log(this.bodyPut)
  }

  editVal(){
    this.hide = true;
  }


  updateButton(): void{
    
    
    console.log(this.bodyPut)
    this.portfolioData.putPersona(

      this.bodyPut

      // send data to the portfolio.service.ts
      ).subscribe(data =>{
      //console.log(data);

      // refresh the component
      
      setTimeout( () => {this.hide = false; this.ngOnInit(); console.log('Persona updated..!')/*Your Code*/ }, 500 );
      
    });
  }

  handleMissingImage(event: Event) {
    console.log('error', event);
    alert('No image found');
  }


}
