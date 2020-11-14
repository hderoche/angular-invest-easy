import { AccountService } from './../account.service';
import { Wallet } from './../account';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.sass']
})
export class WalletComponent implements OnInit {

  wallet: Wallet;
  isConnected: boolean;
  constructor(
    private authenticationService: AuthentificationService,
    private router: Router,
    private restAccount: AccountService,
    private restProduct: ProductService
    ) {
      if (this.authenticationService.currentUserValue !== null) {
        this.isConnected = true;
    }else{
      this.router.navigate(['/']);
    }
    }

  ngOnInit(): void {
  }

}
