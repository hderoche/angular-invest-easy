import { Credentials } from './account';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private currentUserSubject: BehaviorSubject<Credentials>;
  public currentUser: Observable<Credentials>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Credentials>(
      new Credentials({token: localStorage.getItem('token'), user_id: localStorage.getItem('userId')}));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): Credentials {
    return this.currentUserSubject.value;
  }

  login$ = (params = {}, headers = {}, body = { email: null, password: null }) =>
    this.http.post<Credentials>('/users/login', body).pipe(
      tap(() => localStorage.clear()),
      tap(res => console.log('/users/login returns', res)),
      map(creds => {
        const credentials = new Credentials(creds);
        localStorage.setItem('token', credentials.token);
        localStorage.setItem('userId', credentials.userId);
        this.currentUserSubject.next(credentials);
        return credentials;
      }))

    logout$(): void {
      localStorage.clear();
      this.currentUserSubject.next(null);
    }
}
