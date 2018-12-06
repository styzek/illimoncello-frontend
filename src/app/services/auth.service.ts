import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { TokenStorage } from '../user/token.storage';
import { Iuser } from '../domain/iuser';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  authenticatedUserName = new BehaviorSubject<string>('non connected');
  currentMessage = this.authenticatedUserName.asObservable();

  user: Iuser = {username: '', password: ''};

  constructor(private http: HttpClient, private token: TokenStorage) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('attempAuth ::');
    return this.http.post<any>('http://localhost:8080/api/token/generate-token', credentials);
  //   .pipe(tap(user => {
  //     this.authenticatedUser.subscribe;

  // }));
  }

  private hasToken(): boolean {
    return !!this.token.getToken();
  }

  changeMessage(message: string) {
    this.authenticatedUserName.next(message);
}

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

}
