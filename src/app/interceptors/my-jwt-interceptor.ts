import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorage } from '../user/token.storage';

const TOKEN_HEADER_KEY = `Authorization`;


@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const currentUser = this.token.getToken();
    if (this.token.getToken() != null) {
     // req.headers['Authorization'] = "Bearer "+ this.token.getToken();
      req = req.clone({setHeaders: {'Authorization': `Bearer ${currentUser}`}});
    }
    return next.handle(req);
  }

}




