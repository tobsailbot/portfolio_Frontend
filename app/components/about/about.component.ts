import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  miPortfolio:any;
  constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {
    this.portfolioData.getData().subscribe(data =>{

      console.log(data);
      // seleccionar el index del array de datos
      this.miPortfolio = data[0];

    });


    this.portfolioData.putData().subscribe(data =>{
      console.log(data);
    }); 

  }

}
