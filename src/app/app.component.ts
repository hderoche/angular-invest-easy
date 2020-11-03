import { AccountService } from './account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-invest-easy';

  token = localStorage.length;

  constructor(private restAccount: AccountService) {}
  isLogged(): boolean {
    if (localStorage.getItem('token')){
      this.restAccount.checkToken();
    } else {
      return false;
    }
  }
}
