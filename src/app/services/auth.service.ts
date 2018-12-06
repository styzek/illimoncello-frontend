import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { TokenStorage } from '../user/token.storage';
import { User } from '../domain/user';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  authenticatedUserName = new BehaviorSubject<string>('non connected');
  currentMessage = this.authenticatedUserName.asObservable();

  user: User = {username: '', password: ''};

  constructor(private http: HttpClient, private token: TokenStorage, private router: Router) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    return this.http.post<any>('http://localhost:8080/api/token/generate-token', credentials);
  //   .pipe(tap(user => {
  //     this.authenticatedUser.subscribe;
  // }));
  }

  private hasToken(): boolean {
    return !!this.token.getToken();
  }

  private changeMessage(message: string) {
    this.authenticatedUserName.next(message);
}

  login(username: string, password: string): void {
    this.attemptAuth(username, password).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.isLoginSubject.next(true);
        sessionStorage.setItem('currentuser', username);
        this.changeMessage(username);
       
        this.router.navigate(['welcome']);
      }
    );
  }

  logout(): void {
    this.token.signOut();
    //this.isLoggedIn = false;
    this.isLoginSubject.next(false);
    window.sessionStorage.removeItem('currentuser');
    localStorage.clear();
    
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
}
