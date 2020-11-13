import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { User, Wallet } from '../account';

@Component({
  selector: 'app-god',
  templateUrl: './god.component.html',
  styleUrls: ['./god.component.css']
})
export class GodComponent implements OnInit {


  data: User[] = [];
  displayedDataUser: User[] = [];
  displayedColumnsUser: string[] = ['name', 'firstname', 'email', 'password', 'telephone', 'adress', 'nationality', 'birthDate'];
  columnsToDisplayUser: string[] = this.displayedColumnsUser.slice();

  danger: string;
  dataWallet: Wallet[] = [];
  displayedDataWallet: Wallet[] = [];
  displayedColumnsWallet: string[] = ['user_id'];
  columnsToDisplayWallet: string[] = this.displayedColumnsWallet.slice();

  constructor(private restAccount: AccountService) { }

  ngOnInit(): void {
    this.restAccount.getAllUsers$().subscribe((res) => {
      if (res !== undefined){
        this.displayedDataUser = res.map(element => new User(element));
      }
    });

    this.restAccount.getAllWallets$().subscribe((res) => {
      if (res !== undefined){
        this.danger = res.danger;
        this.displayedDataWallet = (res.wallets).map(element => new Wallet(element));
      }
    });

  }
}
