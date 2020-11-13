import { ShareRecord, Share } from './product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllShares$ = (params = {}, headers = {}) =>
  this.http.get<Share[]>('/shares/').pipe(map(shares => {
    shares.map(share => new Share(share));
    return shares;
  }))

  getOneShare$ = (params = {ticker: null}, headers = {}) =>
  this.http.get<Share>('/shares/' + params.ticker)
}
