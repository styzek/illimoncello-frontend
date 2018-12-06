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

  user: Iuser = {username: '', password: ''};

  ngOnInit(): void {

  }

  constructor(private router: Router, private authService: AuthService, private token: TokenStorage) {
  }

  login(): void {
    this.authService.attemptAuth(this.user.username, this.user.password).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.authService.isLoginSubject.next(true);
        this.authService.changeMessage(this.user.username);
        this.router.navigate(['welcome']);
      }
    );
  }

  logout (): void {
    this.token.signOut;
    this.authService.isLoginSubject.next(false);
  }
}
