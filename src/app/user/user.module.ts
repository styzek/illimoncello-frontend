import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, InscriptionComponent, CartComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserModule { }
