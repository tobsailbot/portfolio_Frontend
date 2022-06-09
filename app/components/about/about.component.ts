import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    fadeInOnEnterAnimation({ duration: 600 }),
    fadeOutOnLeaveAnimation({ duration: 600 }),
  ]
})
export class AboutComponent implements OnInit {
  
  hide = false;

  data_ok = false;

  bodyPut:any = {};

  portfolio_persona:any;

  is_logged:any = false;

  uploading:any = false; // si está enviando datos al servidor
  
  constructor(private portfolioData:PortfolioService) {
    this.portfolioData.myMethod$.subscribe((data) => {
      this.is_logged = data;
    }
    );
  }

  ngOnInit(): void {

    this.portfolioData.getPersona().subscribe(data =>{

      if (data.status === 200){ // si la respuesta es correcta
        this.data_ok = true;
      }
      
      console.log('Getting Persona data...');

      // seleccionar el index del array de datos
      this.portfolio_persona = data.body[0];
      this.bodyPut = this.portfolio_persona;
    });

    this.keepAwake();
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

    this.uploading = true;
    
    this.portfolioData.putPersona(this.bodyPut).subscribe(data =>{
      
        if (data.status === 200){
          this.hide = false;
          console.log('Persona updated...');
          this.ngOnInit();
        }     
      this.uploading = false;
    });
  }

  handleMissingImage(event: Event) {
    console.log('error', event);
    alert('No image found');
  }

  cancelEdit(){
    this.hide = false;
  }

   // keep awake every 5 minutes

  keepAwake() {
    
      setInterval(() => {this.portfolioData.getSkill().subscribe(data =>{console.log('keep alive');})}, 10000);
      return true;
  }


}
