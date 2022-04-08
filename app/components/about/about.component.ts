import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  

  portfolio_persona:any;
  constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {
    this.portfolioData.getData().subscribe(data =>{

      console.log(data);
      // seleccionar el index del array de datos
      this.portfolio_persona = data[0];

    });

    
    /*this.portfolioData.putData().subscribe(data =>{
      console.log(data);
    }); */

  }

  updateButton(): void{

    this.portfolioData.putData({
      "id":1,
      "nombre": "testeoooxd",
      }).subscribe(data =>{
      console.log(data);
      this.ngOnInit();
    });
  }

}
