import { Component, OnInit } from '@angular/core';
import { PizzasService } from 'src/app/services/pizzas.service';
import { Ipizza } from 'src/app/domain/ipizza';
import * as Rx from "rxjs";	
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-pizzas',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartPizzas: Ipizza[];
	showDataNotFound = true;

	// Not Found Message
	messageTitle = 'No Products Found in Cart';
	messageDescription = 'Please, Add Pizzas to Cart';

	constructor(private _Service: CartService) {}



	ngOnInit() {
		//const subject = new Rx.BehaviorSubject();

		this.getCartPizza();
	}

	removeCartPizza(pizza: Ipizza) {
		this._Service.removeLocalCartPizza(pizza);

		// Recalling
		this.getCartPizza();
	}

	getCartPizza() {
		this.cartPizzas = this._Service.getLocalCartPizzas();
	}

	addNumberOfPizzaToCart(pizza: Ipizza)
	{this._Service.addNumberOfPizzaToCart(pizza)}
	
	substractNumberOfPizzaToCart(pizza: Ipizza)
	{this._Service.substractNumberOfPizzaToCart(pizza)}
}
