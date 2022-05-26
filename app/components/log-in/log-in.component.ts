import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

public data:any = false;

constructor(private portfolioData:PortfolioService) { }

  ngOnInit(): void {
  }

  login_arr:any = {};


  login_status:any;

  @Output() loginEvent = new EventEmitter<boolean>();


  onSubmit(event:any) { // al enviar el formulario obtener valores y asignar a un objeto
     
    const formulario = event.target; // obtener el formulario
     for (let i = 0; i < formulario.length; i++) {
       if(formulario[i].type === "text" || formulario[i].type === "password"){
         this.login_arr[formulario[i].id] = formulario[i].value;
       }
     }
     this.login_status = 'Ingresando...';

     this.portfolioData.getLogin().subscribe(data =>{ // obtener datos del servidor
       // si los datos son correctos 
        if (data.body[0].user_name === this.login_arr.user_name && data.body[0].password === this.login_arr.password){
          console.log('Login OK');
          this.login_status = 'Login OK';
          this.data = true;
          this.portfolioData.myMethod(this.data);
          this.loginEvent.emit(this.data);
        }
        else{
          console.log('Login Fail');
          this.login_status = '(X) Usuario o contraseña incorrectos';
        }
        this.ngOnInit();
      });
   }

}
