import { UserRecord, User, Wallet, WalletRecord, WalletListRecord, Credentials } from './account';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Config } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  infos = [];
  getUserDetails$ = (params = { id: null }, headers = {}) =>
    this.http.get<UserRecord>('/users/' + params.id)
      .pipe(map(p => new User(p)))

  getWallet$ = (params = { user_id: null }, headers = {}) =>
    this.http.get<WalletRecord>('/wallet/' + params.user_id)
      .pipe(map(p => new Wallet(p)))

  getAllUsers$ = (params = {}, headers = {}) =>
    this.http.get<UserRecord[]>('/users/')

  getAllWallets$ = (params = {}, headers = {}) =>
    this.http.get<WalletListRecord>('/wallets/')


  postSignup$ = (params = {}, headers = {}, body = {
    name: null,
    firstname: null,
    email: null,
    password: null,
    adress: null,
    nationality: null,
    telephone: null,
    birthDate: null
  }) =>
      this.http.post('/users/signup', body, { observe: 'response' }).pipe(
        map(res => {
        return res.status;
      }))

  checkToken$ = (params = {}, headers = {}, body = { user_id: null }) => {
    return this.http.post('/users/token', body, { observe: 'response' }).pipe(
      tap(_ => console.log('/users/token request')),
      map(res => {
        return res.body;
      }));
  }

  deleteUser$ = (params = {id: null}, headers = {}) => {
    return this.http.delete('/users/delete/' + params.id, {observe: 'response'}).pipe(map(res => {
      return res.status;
    }));
  }

  createWallet$ = (params = {id: null}, headers = {}) => {
    return this.http.post('/wallets/create', {user_id: params.id}).pipe(map(res => {
      return new Wallet(res);
    }));
  }
}

