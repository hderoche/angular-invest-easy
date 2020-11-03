import { UserRecord, User, Wallet, WalletRecord, WalletListRecord } from './account';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Config } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  infos = [];
  getUserDetails$ = (params = {id: null}, headers = {}) =>
  this.http.get<UserRecord>('/users/' + params.id)
       .pipe(map(p => new User(p)))

  getWallet$ = (params = {user_id: null}, headers = {}) =>
  this.http.get<WalletRecord>('/wallet/' + params.user_id)
       .pipe(map(p => new Wallet(p)))

  getAllUsers$ = (params = {}, headers = {}) =>
  this.http.get<UserRecord[]>('/users/')

  getAllWallets$ = (params = {}, headers = {}) =>
  this.http.get<WalletListRecord>('/wallets/')

  postSignin$ = (params = {}, headers = {}, body = {email: null, password: null}) =>
  this.http.post('/users/login', body).subscribe(res => {

  // tslint:disable-next-line: forin
    for (const key in res) {
      console.log(res[key]);
      this.infos.push(res[key]);
    }
    localStorage.setItem('user_id', this.infos[0]);
    localStorage.setItem('token', this.infos[1]);
    })

  postSignup$ = (params = {}, headers = {}, body = {
    name: null,
    firstname: null,
    email: null,
    password: null,
    adress: null,
    nationality: null,
    telephone: null,
    birthDate: null}) => {
    if (body.name !== null && body.firstname !== null && body.email !== null) {
      this.http.post('/users/signup', body, {observe: 'response'}).subscribe(res => {
        console.log(res);
        console.log(res.status);
        return res.status;
      }, (error) => {
        console.log(error);
        return 500;
      });
    }
    else{
      return 501;
    }
  }

  checkToken = (params= {}, headers= {}, body = {user_id: null}) => {
    if (localStorage.getItem('token') !== null && body.user_id !== null) {
    this.http.post('/token', body);
    }else {return ; }
  }
}

