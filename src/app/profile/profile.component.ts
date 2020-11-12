import { AppComponent } from './../app.component';
import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../account';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { parse } from 'path';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user: User;
  constructor(private restAccount: AccountService, private snackbar: MatSnackBar, private router: Router, private appComp: AppComponent) { }

  ngOnInit(): void {
    // tslint:disable-next-line: variable-name
    const user_id = localStorage.getItem('user_id');
    if (user_id){
      this.restAccount.getUserDetails$({id: user_id}).subscribe(user => this.user = user);
    }
    else {
      this.router.navigate(['/']);
    }
  }

  onDelete(): void {
    this.restAccount.deleteUser({id: localStorage.getItem('user_id')}).subscribe(res => {
      console.log('result of delete request : ' + res);
      if (res !== 200){
        this.snackbar.open('Failed to delete your profile', null, {duration: 2 * 1000});
      }
      this.snackbar.open('Successfully deleted your profile!', null, {duration: 2 * 1000});
      console.log('delete req');
      this.router.navigate(['/']);
      localStorage.clear();
      this.appComp.isConnected = false;
    });
  }

}
