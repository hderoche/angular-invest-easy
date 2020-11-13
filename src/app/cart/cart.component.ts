import { AccountService } from './../account.service';
import { AppComponent } from './../app.component';
import { Share } from './../product';
import { Component, Input, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Wallet } from '../account';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  shareCart = [];
  shareCartId = [];
  total: number;
  isConnected: boolean;
  walletUpdated: Wallet;
  constructor(
    private appComp: AppComponent,
    private restAccount: AccountService,
    private authenticationService: AuthentificationService,
    private snackBar: MatSnackBar
    ) {
      if (this.authenticationService.currentUserValue) {
        this.isConnected = true;
      }
    }

  ngOnInit(): void {

    this.shareCart = this.appComp.shareCart;
    console.log(this.shareCart);
    this.total = this.calculateTotal(this.shareCart);
  }

  calculateTotal(shareList): number {
    let totalAmount = 0;
    shareList.forEach(element => {
      totalAmount = totalAmount + element.share.lastPrice * element.count;
    });
    return totalAmount;
  }

  add(share): void {
    share.count = share.count + 1;
    this.total = this.calculateTotal(this.shareCart);

  }

  remove(share): void {
    share.count = share.count - 1;
    this.total = this.calculateTotal(this.shareCart);
    if (share.count <= 0) {
      this.shareCart.splice(this.shareCart.indexOf(share.count === 0), 1);
    }
  }

  onPay(): void {
    console.log(this.shareCart);
    this.shareCart.forEach(elt => {
      this.shareCartId.push({share_id: elt.share._id, count: elt.count});
    });
    console.log(this.shareCartId);
    this.restAccount.addShares$(null, null, {user_id: localStorage.getItem('userId'), portefolio: this.shareCartId}).subscribe(wal => {
      console.log(wal);
      this.walletUpdated = wal;
      this.shareCart = [];
      this.snackBar.open('Successfully added the shares to your wallet !', null, {duration: 2 * 1000});
    });
  }

}
