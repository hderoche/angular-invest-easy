import { AccountService } from './../account.service';
import { AppComponent } from './../app.component';
import { Share } from './../product';
import { Component, Input, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  shareCart = [];
  total: number;
  isConnected: boolean;
  constructor(
    private appComp: AppComponent,
    private restAccount: AccountService,
    private authenticationService: AuthentificationService
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

  // onPay(): void {
  //   console.log(this.shareCart);
  //   this.restAccount.getWallet$({user_id: localStorage.getItem('user_id')}).subscribe(wal => {
  //     wal.portefolio.forEach(elt => {
  //       if (this.shareCart.find(sh => sh.share.ticker === elt.share.ticker) !== undefined) {
  //       }
  //     })
  //   })
  // }

}
