import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [LoginComponent, InscriptionComponent, CartComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
