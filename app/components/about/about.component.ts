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
    

    this.bodyPut= this.portfolio_persona;
    const key = event.target.name as string;
    this.bodyPut[key as keyof typeof this.bodyPut] = event.target.value;

  }

  editVal(){
    this.hide = true;
  }


  updateButton(): void{
    
    this.portfolioData.putPersona(this.bodyPut).subscribe(data =>{
      
        if (data.status === 200){
          this.hide = false;
          console.log('Persona updated...');
          this.ngOnInit();
        }     
    });
  }

  handleMissingImage(event: Event) {
    console.log('error', event);
    alert('No image found');
  }

  cancelEdit(){
    this.hide = false;
  }

}
