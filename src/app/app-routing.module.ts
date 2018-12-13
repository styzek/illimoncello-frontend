import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './pizza/welcome/welcome.component';
import {PizzaListComponent} from './pizza/pizza-list/pizza-list.component';
import {LoginComponent} from './user/login/login.component';
import {CartComponent} from './user/cart/cart.component';
import {ErrorComponent} from './other/error/error.component';
import {PizzaCustomComponent} from './pizza/pizza-custom/pizza-custom.component';
import {BestPizzaComponent} from './pizza/pizza-best/pizza-best.component';
import {InscriptionComponent} from './user/inscription/inscription.component';
import {PizzaPartyComponent} from './pizza/pizza-party/pizza-party.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'pizzas', component: PizzaListComponent},
  {path: 'bestpizzas', component: BestPizzaComponent},
  {path: 'pizzacustom', component: PizzaCustomComponent},
  {path: 'pizzaparty', component: PizzaPartyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: InscriptionComponent},
  {path: 'cart', component: CartComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
