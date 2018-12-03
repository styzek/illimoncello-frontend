import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorage } from '../token.storage';
import { Iuser } from 'src/app/domain/iuser';

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
        this.router.navigate(['welcome']);
      }
    );
  }
}
