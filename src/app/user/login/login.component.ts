import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorage } from '../token.storage';
import { Iuser } from 'src/app/domain/iuser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    
  }

  constructor(private router: Router, private authService: AuthService, private token: TokenStorage) {
  }

  user: Iuser = {username: '', password: ''};

  login(): void {
    this.authService.attemptAuth(this.user.username, this.user.password).subscribe(
      data => {
        this.token.saveToken(data.token);
        localStorage.setItem('currentuser', this.user.username);
        this.router.navigate(['welcome']);
        this.authService.isLoginSubject.next(true);
      }
    );
  }

  logout (): void {
    this.token.signOut;
    this.authService.isLoginSubject.next(false);
    localStorage.removeItem('currentuser');
  }

  isLoggedIn() : Observable<boolean> {
    return this.authService.isLoginSubject.asObservable();
  }

}
