import { AppComponent } from './../app.component';
import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  connected: boolean;


  constructor(
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar,
    private authenticationService: AuthentificationService
    ) {
    }
    ngOnInit(): void {
      if (this.authenticationService.currentUserValue) {
        this.connected = true;
      }
    }

    onLogout(): void {
      const message = 'Successfully logged out';
      this._snackBar.open(message, null, {
        duration: 2 * 1000
      });
      this.authenticationService.logout$();
      this.connected = false;
  }

}
