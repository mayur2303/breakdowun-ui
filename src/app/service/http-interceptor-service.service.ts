import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

const TOKEN_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorServiceService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let autreq = req;
    const token = this.authService.getToken();

    if (token != null){
      autreq = req.clone({headers: req.headers.set(TOKEN_KEY, 'Bearer ' + token)});
    }
    return next.handle(autreq);

  }
}
