import { AccountService } from './account.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-invest-easy';

  token = localStorage.length;
  isConnected: boolean;
  shareCart = [];


  constructor(private restAccount: AccountService) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.isConnected = this.isLogged();
  }

  public isLogged(): boolean {
    console.log('connecting ...');
    let conn: boolean;
    try {
      if (localStorage.getItem('token')) {
        const response$ = this.restAccount.checkToken({}, {}, {user_id: localStorage.getItem('user_id')});
        response$.subscribe(res => {
          if (res[Object.keys(res).find(key => key === 'token')] === localStorage.getItem('token')) {
            console.log('result of http post : ' + true);
            conn = true;
          } else {
            conn = false;
          }
        });
        return conn;
      }
    } catch {
      console.log('err in the isLogged function');
      return false;
    }
  }

}
