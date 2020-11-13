import { AppComponent } from './../app.component';
import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { Component, Input, OnInit } from '@angular/core';
import { User, Wallet } from '../account';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthentificationService } from '../authentification.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user: User;
  wallet: Wallet;
  isConnected: boolean;
  constructor(
    private restAccount: AccountService,
    private snackbar: MatSnackBar,
    private router: Router,
    private authentificationService: AuthentificationService) {
      if (this.authentificationService.currentUserValue) {
        this.isConnected = true;
      }
    }

  ngOnInit(): void {
    // tslint:disable-next-line: variable-name
    const userId = localStorage.getItem('userId');
    if (userId){
      this.restAccount.getUserDetails$({id: userId}).subscribe(user => this.user = user);
    }
    else {
      this.router.navigate(['/']);
    }
  }

  onDelete(): void {
    this.restAccount.deleteUser$({id: localStorage.getItem('userId')}).subscribe(res => {
      console.log('result of delete request : ' + res);
      if (res !== 200){
        this.snackbar.open('Failed to delete your profile', null, {duration: 2 * 1000});
      }
      this.snackbar.open('Successfully deleted your profile!', null, {duration: 2 * 1000});
      console.log('delete req');
      this.router.navigate(['/']);
      localStorage.clear();
      this.authentificationService.logout$();
    });
  }

  createWallet(): void {
    this.restAccount.createWallet$({id: localStorage.getItem('userId')}).subscribe(wallet => {
      this.wallet = wallet;
      this.snackbar.open('Successfully created your wallet!', null, {duration: 2 * 1000});
    });
  }

}
