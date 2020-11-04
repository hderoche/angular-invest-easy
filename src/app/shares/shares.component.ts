import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Share } from '../product';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.css']
})
export class SharesComponent implements OnInit {

  constructor(private restProduct: ProductService, private router: Router) {}

  displayedDataShare: Share[] = [];
  displayedColumnsShare: string[] = ['name', 'ticker', 'description', 'lastPrice', 'isUp', 'capitalisation', 'volume', 'per'];
  columnsToDisplayShare: string[] = this.displayedColumnsShare.slice();
  listTags: string[] = [];
  listTagsFiltered: string[] = [];
  dataSource: MatTableDataSource<Share>;

  selectedTags: string[] = [];

  ngOnInit(): void {
    this.restProduct.getAllShares$().subscribe((res) => {
      this.displayedDataShare = res.map(element => new Share(element));
      this.displayedDataShare.forEach(element => {
        element.tags.forEach(elt => {
          this.listTags.push(elt);
        });
      });
      this.listTagsFiltered = this.listTags.filter(onlyUnique);
      this.dataSource = new MatTableDataSource(this.displayedDataShare);
    });
  }

  // tslint:disable-next-line: typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToShare(row: Share): void {
    this.router.navigateByUrl('shares/' + row.ticker, {state : row});
  }

}

function onlyUnique(value, index, self): boolean {
  return self.indexOf(value) === index;
}


