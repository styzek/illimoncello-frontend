import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaCustomComponent } from './pizza-custom/pizza-custom.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BestPizzaComponent } from './pizza-best/pizza-best.component';

@NgModule({
  declarations: [PizzaListComponent, PizzaCustomComponent, WelcomeComponent, BestPizzaComponent],
  imports: [
    CommonModule
  ]
})
export class PizzaModule { }
