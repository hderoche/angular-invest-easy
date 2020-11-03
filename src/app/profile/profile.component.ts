import { AccountService } from './../account.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //@Input() userId: User;
  user: User = null;
  constructor(private restAccount: AccountService) { }

  ngOnInit(): void {
    // this.restAccount.getUserDetails$({id: this.userId}).subscribe((res) => {
    //   console.log(res);
    //   if (res) {
    //     this.user = res;
    //   }
    // });
    this.user = new User({
      name: 'deroche',
      firstname: 'hugo',
      telephone: '200383949',
      adress: 'jffoekok',
      nationality: 'French',
      birthDate: '01/89/03',
      password: 'kvnrivnirjvirjijrivjir',
      email: 'hugo.deroche@gmail.com'
    });
  }

}
