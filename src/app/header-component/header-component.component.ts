import { Component, OnInit, ApplicationRef, ChangeDetectorRef, NgZone, Input } from '@angular/core';
import { LoginComponent } from '../user/login/login.component';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Iuser } from '../domain/iuser';


@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

  @Input()
  isLoggedIn: boolean;

  currentUser: string;

  constructor(private login: LoginComponent, private authserv: AuthService) {
   }

  ngOnInit() {
    this.authserv.isLoggedIn().subscribe(value => this.isLoggedIn = value);
    this.authserv.currentMessage.subscribe( name => this.currentUser = name);
  }
 }
