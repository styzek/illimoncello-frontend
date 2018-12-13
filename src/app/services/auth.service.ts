import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { TokenStorage } from '../user/token.storage';
import { User } from '../domain/user';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Pizza } from '../domain/pizza';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  pizzaFav : Pizza[];
  authenticatedUserName = new BehaviorSubject<string>('non connected');
  currentMessage = this.authenticatedUserName.asObservable();

  private URL = 'http://localhost:8080/api/pizza';

  user: User = {username: '', password: ''};

  constructor(private _http: HttpClient, private _tokenService: TokenStorage) {
    this.pizzaFav = [];
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    return this._http.post<any>('http://localhost:8080/api/token/generate-token', credentials);
  }

  private hasToken(): boolean {
    return !!this._tokenService.getToken();
  }

  private changeMessage(message: string) {
    this.authenticatedUserName.next(message);
  }

  login(username: string, password: string): void {
    this.attemptAuth(username, password).subscribe(
      data => {
        this._tokenService.saveToken(data.token);
        this.isLoginSubject.next(true);
        sessionStorage.setItem('currentuser', username);
        this.changeMessage(username);
        this.getUserFavPizza(username).subscribe(value => this.pizzaFav = value);
        sessionStorage.setItem('favPizzas', JSON.stringify(this.pizzaFav));
      }
    );
  }

  logout(): void {
    this._tokenService.signOut();
    this.isLoginSubject.next(false);
    window.sessionStorage.removeItem('currentuser');
    this.pizzaFav = [];
    window.sessionStorage.removeItem('favPizzas');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  getUserFavPizza(name:string): Observable<Pizza[]>{
    return this._http.get<Pizza[]>(this.URL + '/bestpizzas/' + name);
  }

  removeBestPizza(pizza: Pizza[], name: string): Observable<Pizza[]>{
    return this._http.post<Pizza[]>(this.URL + '/removebestpizza/' + name, pizza);
  }

}
