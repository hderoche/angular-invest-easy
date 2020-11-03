import { LogoutSnackbarComponent } from './../logout-snackbar/logout-snackbar.component';
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

  options: FormGroup;
  colorControl = new FormControl('primary');

  // tslint:disable-next-line: variable-name
  constructor(fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.options = fb.group({
      color: this.colorControl
    });
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
