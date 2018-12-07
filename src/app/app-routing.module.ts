import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pizza/welcome/welcome.component';
import { PizzaListComponent } from './pizza/pizza-list/pizza-list.component';
import { LoginComponent } from './user/login/login.component';
import { CartComponent } from './user/cart/cart.component';
import { ErrorComponent } from './other/error/error.component';
import { PizzaCustomComponent } from './pizza/pizza-custom/pizza-custom.component';
import { BestPizzaComponent } from './pizza/pizza-best/pizza-best.component';
import { InscriptionComponent } from './user/inscription/inscription.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'pizzas', component: PizzaListComponent},
  { path: 'bestpizzas', component: BestPizzaComponent},
  // { path: 'pizza/:id', component: },
  // { path: 'add', component: ProductsAddComponent, canActivate: [ProductAddGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: InscriptionComponent},
  { path: 'cart', component: CartComponent},
  { path: '**', component: ErrorComponent},

  
  /* {path: 'pizzas',
  children: [
    {
      path: 'list',
      component: PizzaListComponent
    },
    {
      path: 'custom',
      component: PizzaCustomComponent
    },
     {
      path: 'favourite-pizzas',
      component: FavouritePizzasComponent
    }, 
    {
      path: 'cart',
      component: CartComponent
    }
     {
      path: 'checkouts',
      loadChildren: './checkout/checkout.module#CheckoutModule'
    } 
  ]}, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
