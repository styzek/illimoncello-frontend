import { Component, OnInit } from '@angular/core';
import { PizzasService } from 'src/app/services/pizzas.service';
import { Pizza } from 'src/app/domain/pizza';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-cart-pizzas',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	
  cartPizzas: Pizza[];
	showDataNotFound = true;
	resultMessage: String;
	isLoggedIn: boolean;
	// Not Found Message
	messageTitle = 'No Products Found in Cart';
	messageDescription = 'Please, Add Pizzas to Cart';

	constructor(private _Service: PizzasService, private authserv: AuthService,private _cartService: CartService, private router: Router) {}

	ngOnInit() {
		//const subject = new Rx.BehaviorSubject();
		this.authserv.isLoggedIn().subscribe(value => this.isLoggedIn = value);
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

	checkoutcart(){
		this._cartService.checkoutCart(this.cartPizzas).subscribe(resp => {window.sessionStorage.removeItem('avct_item');
		this.router.navigate(['welcome']);},
			err => console.log('*** Attention : Il y a eu erreur lors de l\'encodage du panier : ' + err));
	}
}
