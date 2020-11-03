import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type } from 'os';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const BASE_URL = 'http://deroche.freeboxos.fr:8500';
    if (request.url.startsWith('/users/token')) {
    // Logged in. Add Bearer token.
    let h: HttpHeaders = request.headers;
    const token = localStorage.getItem('token');
    h = h.append('Authorization', 'Bearer ' + token);
    h = h.append('Content-Type', 'application/json');
    return next.handle(request.clone({ headers: h, url: BASE_URL + request.url }));
    }
    else {
        return next.handle(request.clone({url: BASE_URL + request.url}));
    }
  }
}
