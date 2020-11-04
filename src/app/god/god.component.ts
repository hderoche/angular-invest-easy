import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { User, Wallet } from '../account';
import { Tile } from '../interface';
import { HtmlParser } from '@angular/compiler';
@Component({
  selector: 'app-god',
  templateUrl: './god.component.html',
  styleUrls: ['./god.component.css']
})
export class GodComponent implements OnInit {

  tiles: Tile[] = [
    {text: `<div class="god-user-table" *ngIf="displayedDataUser">
    <table mat-table [dataSource]="displayedDataUser" class="mat-elevation-z8">
        <ng-container [matColumnDef]="column" *ngFor="let column of displayedColumnsUser">
          <th mat-header-cell *matHeaderCellDef> {{column}} </th>
          <td mat-cell *matCellDef="let element"> {{element[column]}} </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columnsToDisplayUser"></tr>
        <tr mat-row *matRowDef="let row; columns: columnsToDisplayUser;"></tr>
    </table>
</div>`
  , cols: 3, rows: 1, color: 'lightblue'},
    {text: `<h3>{{danger}}</h3>
    <div class="god-wallet-table" *ngIf="dataWallet">
        <table mat-table [dataSource]="displayedDataWallet" class="mat-elevation-z8">
            <ng-container [matColumnDef]="column" *ngFor="let column of displayedColumnsWallet">
              <th mat-header-cell *matHeaderCellDef> {{column}} </th>
              <td mat-cell *matCellDef="let element"> {{element[column]}} </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="columnsToDisplayWallet"></tr>
            <tr mat-row *matRowDef="let row; columns: columnsToDisplayWallet;"></tr>
        </table>
    </div>
    `, cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  data: User[] = [];
  displayedDataUser: User[] = [];
  displayedColumnsUser: string[] = ['name', 'firstname', 'email', 'password', 'telephone', 'adress', 'nationnality', 'birthDate'];
  columnsToDisplayUser: string[] = this.displayedColumnsUser.slice();

  danger: string;
  dataWallet: Wallet[] = [];
  displayedDataWallet: Wallet[] = [];
  displayedColumnsWallet: string[] = ['user_id', 'portefolio'];
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
