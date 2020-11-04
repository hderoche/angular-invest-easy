import { AccountService } from './../account.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../account';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user: User;
  constructor(private restAccount: AccountService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: variable-name
    const user_id = localStorage.getItem('user_id');
    if (user_id){
      this.restAccount.getUserDetails$({id: user_id}).subscribe(user => this.user = user);
    }
  }

}
