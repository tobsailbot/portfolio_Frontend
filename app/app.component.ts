import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'portfolio_ap';
  
  hide_login:boolean = true;

  loginButton(){
    window.location.href = "#";
    if (this.hide_login){
      this.hide_login = false;
      console.log('Login page true');
    }
    else{
      this.hide_login = true;
      console.log('Login page false');
    }
  }

}
