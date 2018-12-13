import { Component, OnInit } from '@angular/core';
import { PizzasService } from 'src/app/services/pizzas.service';
import { Pizza } from 'src/app/domain/pizza';
import * as Rx from "rxjs";	
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-cart-pizzas',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  	cartPizzas: Pizza[];
	showDataNotFound = true;
	isLoggedIn: boolean;
	pizzaFav: Pizza[];
	result: String;

	// Not Found Message
	messageTitle = 'No Products Found in Cart';
	messageDescription = 'Please, Add Pizzas to Cart';

	constructor(private _pizzaService: PizzasService, private _authSevice: AuthService, private messageService : MessageService) {}



	ngOnInit() {
		//const subject = new Rx.BehaviorSubject();
		
		this._authSevice.isLoggedIn().subscribe(value => this.isLoggedIn = value);
		this._authSevice.getUserFavPizza(sessionStorage.getItem('currentuser')).subscribe(value => this.pizzaFav = value);

		this.getCartPizza();
	}

	removeCartPizza(pizza: Pizza) {
		this._pizzaService.removeLocalCartPizza(pizza);

		// Recalling
		this.getCartPizza();
	}

	getCartPizza() {
		this.cartPizzas = this._pizzaService.getLocalCartPizzas();
	}

	addNumberOfPizzaToCart(pizza: Pizza){
		this._pizzaService.addNumberOfPizzaToCart(pizza);
	}
	
	substractNumberOfPizzaToCart(pizza: Pizza){
		this._pizzaService.substractNumberOfPizzaToCart(pizza);
	}

	addBestPizza(pizza: Pizza) {
    
		if (!this.pizzaFav.some( pizzaf => pizzaf.name === pizza.name)){
		  this._pizzaService.addBestPizza(pizza, window.sessionStorage.getItem('currentuser')).subscribe(resp => this._authSevice.pizzaFav.push(resp));
		  this.messageService.add({key: 'myKey1', severity:'success', summary: 'Success', detail: 'Pizza added to favorites'});
		console.log(this.result);
		} else {
		  this.messageService.add({key: 'myKey1', severity:'error', summary: 'Failure', detail: 'Pizza already in favorites'});
		}
	   
	  }
}
