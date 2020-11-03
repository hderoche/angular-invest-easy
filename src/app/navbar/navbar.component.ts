import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  @Input() connected: boolean;


  // tslint:disable-next-line: variable-name
  constructor(private _snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
  }

  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    const message = 'Successfully logged out';
    this._snackBar.open(message, null, {
      duration: 2 * 1000
    });
    this.connected = false;
  }

}
