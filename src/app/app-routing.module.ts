import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pizza/welcome/welcome.component';
import { PizzaListComponent } from './pizza/pizza-list/pizza-list.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutService } from './user/resolver/logout.service';
import { CartComponent } from './user/cart/cart.component';
import { ErrorComponent } from './other/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'pizzas', component: PizzaListComponent},
  // { path: 'pizza/:id', component: },
  // { path: 'add', component: ProductsAddComponent, canActivate: [ProductAddGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: WelcomeComponent,  resolve: [LogoutService]},
  { path: 'cart', component: CartComponent},
  { path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
