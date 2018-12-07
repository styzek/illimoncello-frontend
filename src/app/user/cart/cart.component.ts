import { Component, OnInit } from '@angular/core';
import { PizzasService } from 'src/app/services/pizzas.service';
import { Pizza } from 'src/app/domain/pizza';
import * as Rx from "rxjs";	

@Component({
  selector: 'app-cart-pizzas',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartPizzas: Pizza[];
	showDataNotFound = true;

	// Not Found Message
	messageTitle = 'No Products Found in Cart';
	messageDescription = 'Please, Add Pizzas to Cart';

	constructor(private _Service: PizzasService) {}



	ngOnInit() {
		//const subject = new Rx.BehaviorSubject();

		this.getCartPizza();
	}

	removeCartPizza(pizza: Pizza) {
		this._Service.removeLocalCartPizza(pizza);

		// Recalling
		this.getCartPizza();
	}

	getCartPizza() {
		this.cartPizzas = this._Service.getLocalCartPizzas();
	}

	addNumberOfPizzaToCart(pizza: Pizza){
		this._Service.addNumberOfPizzaToCart(pizza);
	}
	
	substractNumberOfPizzaToCart(pizza: Pizza){
		this._Service.substractNumberOfPizzaToCart(pizza);
	}
}
