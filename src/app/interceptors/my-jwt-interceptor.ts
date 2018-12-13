import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorage } from '../user/token.storage';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private _tokenService: TokenStorage) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const currentUser = this._tokenService.getToken();
    if (this._tokenService.getToken() != null) {
      req = req.clone({setHeaders: {'Authorization': `Bearer ${currentUser}`}});
    }
    return next.handle(req);
  }

}




