import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import {CalendarModule} from 'primeng/calendar';
import { CartCalculatorComponent } from './cart-calculator/cart-calculator.component';

@NgModule({
  declarations: [LoginComponent, InscriptionComponent, CartComponent, CartCalculatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CalendarModule
  ]
})
export class UserModule { }
