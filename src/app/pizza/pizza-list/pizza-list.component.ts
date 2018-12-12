import { Component, OnInit, Input } from '@angular/core';
import { PizzasService } from 'src/app/services/pizzas.service';
import { Pizza } from 'src/app/domain/pizza';
import { Category } from 'src/app/domain/category';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {

pizzas: Pizza[];
categories: Category[];
isLoggedIn: boolean;
result: String;
pizzaFav: Pizza[];


  constructor(private router: Router, private authserv: AuthService, private _pizzaService: PizzasService, private messageService : MessageService) { }

  ngOnInit() {
    this.authserv.isLoggedIn().subscribe(value => this.isLoggedIn = value);
    this.authserv.getUserFavPizza(sessionStorage.getItem('currentuser')).subscribe(value => this.pizzaFav = value);
    this._pizzaService.getPizzasAll().subscribe(
      resp => {this.pizzas = resp;},
      err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getPizzasAll : ' + err));

     this._pizzaService.getAllCategory().subscribe(resp => {this.categories = resp;},
      err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getAllCategory : ' + err));
  }

  pizzaFilterCategory(namecategory: string)
  {
    this._pizzaService.getPizzaByCategory(namecategory).subscribe(resp => {this.pizzas = resp;},
      err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getPizzaByCategory : ' + err));
  }

  addToCart(pizza: Pizza) {
    this._pizzaService.addToCart(pizza);
    this.messageService.add({key: 'myKey1', severity:'success', summary: 'Success', detail: 'Pizza added to cart'});
  }
  
  addBestPizza(pizza: Pizza) {
    
    if (!this.pizzaFav.some( pizzaf => pizzaf.name === pizza.name)){
      this._pizzaService.addBestPizza(pizza, window.sessionStorage.getItem('currentuser')).subscribe(resp => this.result = resp);
      this.messageService.add({key: 'myKey1', severity:'success', summary: 'Success', detail: 'Pizza added to favorites'});
    } else {
      this.messageService.add({key: 'myKey1', severity:'error', summary: 'Failure', detail: 'Pizza already in favorites'});
    }
   
  }

  handleClick() {
    this.router.navigate(['/pizzacustom']);
  }

  removeBestPizza(pizza: Pizza) {
    const index = this.pizzaFav.indexOf(pizza, 0);
    if (index > -1) {
      this.pizzaFav.splice(index, 1);
    }

    this.authserv.removeBestPizza(this.pizzaFav, sessionStorage.getItem('currentuser'));
  
    this.messageService.add({key: 'myKey1', severity:'warn', summary: 'Info', detail: 'Pizza removed from favorites'});
  }
}
