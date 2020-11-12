import { AppComponent } from './../app.component';
import { Share } from './../product';
import { Component, Input, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  shareCart = [];
  total: number;
  isConnected: boolean;
  constructor(private appComp: AppComponent) { }

  ngOnInit(): void {
    this.isConnected = this.appComp.isLogged();
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

}
