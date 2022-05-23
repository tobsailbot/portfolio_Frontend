import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user_login:any = {
    "user_name":"",
    "password":""
    };

  constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {
  }

  loginInput(event:any){
    this.user_login[event.target.name] = event.target.value;
  }

  loginButton(){
  
    this.portfolioData.getLogin().subscribe(data =>{
      if (data.body[0].user_name == this.user_login.user_name && data.body[0].password == this.user_login.password){
        console.log('Login correcto');
      }

      else{
        console.log('Login incorrecto');
      }

    });
  }

}
