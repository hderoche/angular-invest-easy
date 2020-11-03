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
  this.http.get<ShareRecord[]>('http://deroche.freeboxos.fr:8500/shares/')
}
