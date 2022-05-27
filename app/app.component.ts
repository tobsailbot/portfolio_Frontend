import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ // animaciones para elementos que ingresan al DOM
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('0.5s ease-out', style({ height: 450, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 450, opacity: 1 }),
            animate('0.5s ease-in', style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})


export class AppComponent {
  title = 'portfolio_ap';

  login_comp = false;

  is_user_logged_in = false;

  loginClick() {
    window.location.href = "#";
    this.login_comp = !this.login_comp;
  }

  receiveData(event:any) {
    this.login_comp = !this.login_comp;
    this.is_user_logged_in = true;
  }
  

}
