import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaCustomComponent } from './pizza-custom/pizza-custom.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BestPizzaComponent } from './pizza-best/pizza-best.component';
import { ToastModule } from 'primeng/toast';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {DragDropModule} from 'primeng/dragdrop';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PizzaListComponent, PizzaCustomComponent, WelcomeComponent, BestPizzaComponent],
  imports: [
    CommonModule,
    ToastModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DragDropModule,
    TableModule,
    FormsModule,
    
    

  ]
})
export class PizzaModule { }
