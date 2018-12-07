import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/domain/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {username: '', password: ''};

  ngOnInit(): void {
  }

  constructor(private authService: AuthService) {
  }

  login(): void {
    this.authService.login(this.user.username, this.user.password);
  }
}
