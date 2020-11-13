import { AuthentificationService } from './authentification.service';
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
  public isConnected: boolean;
  shareCart = [];


  constructor(
    private restAccount: AccountService,
    private authentificationService: AuthentificationService) {
      if (this.authentificationService.currentUserValue) {
        this.isConnected = true;
      }
    }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
  }


}
