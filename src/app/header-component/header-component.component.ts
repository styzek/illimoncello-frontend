import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

 
  isLoggedIn: boolean;

  currentUser: string;

  constructor(private authserv: AuthService) {
   }

  ngOnInit() {
    this.authserv.isLoggedIn().subscribe(value => this.isLoggedIn = value);
    this.authserv.currentMessage.subscribe(name => this.currentUser = window.sessionStorage.getItem('currentuser'));
    
  }
 }
