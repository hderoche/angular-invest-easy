import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type } from 'os';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const BASE_URL = 'http://deroche.freeboxos.fr:8500';
    if (request.url.startsWith('/token')) {
    // Logged in. Add Bearer token.
    const h: HttpHeaders = request.headers;
    const token = localStorage.getItem('token');
    if ((token !== null || token !== undefined) && typeof(token) === 'string') {
        h.append('Authorization', token);
    } else {return 'error in the authentification token'; }
    console.log(h);
    return next.handle(request.clone({ headers: h, url: BASE_URL + request.url }));
    }
    else {
        return next.handle(request);
    }
  }
}
