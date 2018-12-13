import {Component, OnInit} from '@angular/core';
import {PizzasService} from 'src/app/services/pizzas.service';
import {Pizza} from 'src/app/domain/pizza';
import {CartService} from 'src/app/services/cart.service';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-cart-pizzas',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartPizzas: Pizza[];
  isLoggedIn: boolean;
  pizzaFav: Pizza[];
  result: String;

  // Not Found Message
  messageTitle = 'No Products Found in Cart';
  messageDescription = 'Please, Add Pizzas to Cart';

  constructor(private _pizzaService: PizzasService, private _authSevice: AuthService,
              private _messageService: MessageService, private router: Router, private _cartService: CartService) {
    this.pizzaFav = [];
  }


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

  addNumberOfPizzaToCart(pizza: Pizza) {
    this._pizzaService.addNumberOfPizzaToCart(pizza);
  }

  substractNumberOfPizzaToCart(pizza: Pizza) {
    this._pizzaService.substractNumberOfPizzaToCart(pizza);
  }

  checkoutcart() {
    this._cartService.checkoutCart(this.cartPizzas).subscribe(resp => {
        window.sessionStorage.removeItem('avct_item');
        this.router.navigate(['welcome']);
      },
      err => console.log('*** Attention : Il y a eu erreur lors de l\'encodage du panier : ' + err));
  }

  addBestPizza(pizza: Pizza) {

    if (!this.pizzaFav.some(pizzaf => pizzaf.name === pizza.name)) {
      this._pizzaService.addBestPizza(pizza, window.sessionStorage.getItem('currentuser')).subscribe(resp => this._authSevice.pizzaFav.push(resp));
      this._messageService.add({key: 'myKey1', severity: 'success', summary: 'Success', detail: 'Pizza added to favorites'});
      console.log(this.result);
    } else {
      this._messageService.add({key: 'myKey1', severity: 'error', summary: 'Failure', detail: 'Pizza already in favorites'});
    }

  }
}
