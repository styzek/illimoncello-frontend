import { Component, OnInit, ApplicationRef, ChangeDetectorRef, NgZone, Input } from '@angular/core';
import { LoginComponent } from '../user/login/login.component';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';


@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

  @Input()
  isLoggedIn : boolean;

  nameUser: string = localStorage.getItem('currentuser');
   

  constructor(private login: LoginComponent, private ref: ChangeDetectorRef, private zone : NgZone) {
   
    login.isLoggedIn().subscribe((value) => {
      this.isLoggedIn = value;
      
    });
    this.zone.run(() => {
      this.isLoggedIn = this.isLoggedIn;
      this.nameUser = this.nameUser;
    });
   }

  ngOnInit() {
  }
 
}
