import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pizza } from '../domain/pizza';
import { Category } from '../domain/category';

//import { ToastrService } from './toastr.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class PizzasService {

  navbarCartCount = 0;

	constructor(private _http: HttpClient) { } //private toastrService: ToastrService
		
  private URL = 'http://localhost:8080/api/pizza';


  public getPizzasAll(): Observable<Pizza[]> {
    return this._http.get<Pizza[]>(this.URL+'/pizzas');
	}
	
	public getBestPizzasAll(username: String): Observable<Pizza[]> {
    return this._http.get<Pizza[]>(this.URL+'/bestpizzas');
  }

  public getAllCategory(): Observable<Category[]> {
		return this._http.get<Category[]>(this.URL+'/categories');
	}

  public getProductById(id: number): Observable<Pizza> {
    return this._http.get<Pizza>(this.URL + '/' + id);
  }

  public getPizzaByCategory(name:string): Observable<Pizza[]>{
    return this._http.get<Pizza[]>(this.URL + '/pizzasbycategory/' + name);
  }

  public addBestPizza(p: Pizza, username: String): Observable<any> {
		return this._http.post(this.URL + '/addbestpizza/' + username, p);
	}
 
	// public addProduct(p: Pizza): Observable<any> {
  //   return this._http.post(this.URL, p);
  // }

  	/*
   ----------  Cart Product Function  ----------
  */

	// Adding new Pizza to cart db if logged in else window.sessionStorage
	addToCart(pizza: Pizza): void {

	 	let a: Pizza[];
		a = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];
		pizza.numberofpizza = 1;
		a.push(pizza);
		//this.toastrService.wait('Adding Pizza to Cart', 'Pizza Adding to the cart');
		setTimeout(() => {
			window.sessionStorage.setItem('avct_item', JSON.stringify(a));
			this.calculateLocalCartPizzaCounts();
		}, 500); 
	}

	// Removing cart from local
	removeLocalCartPizza(pizza: Pizza) {
		const pizzas: Pizza[] = JSON.parse(window.sessionStorage.getItem('avct_item'));

		for (let i = 0; i < pizzas.length; i++) {
			if (pizzas[i].id === pizza.id) {
				pizzas.splice(i, 1);
				break;
			}
		}
		// ReAdding the pizzas after remove
		window.sessionStorage.setItem('avct_item', JSON.stringify(pizzas));

		this.calculateLocalCartPizzaCounts();
		window.location.reload();
	}

	// Fetching Locat CartsPizzats
	getLocalCartPizzas(): Pizza[] {
		const pizzas: Pizza[] = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];

		return pizzas;
	}

	// returning LocalCarts Product Count
	calculateLocalCartPizzaCounts() {
		this.navbarCartCount = this.getLocalCartPizzas().length;
	}

	//add a number of pizza in the cart
	addNumberOfPizzaToCart(pizza: Pizza): void {
		let numberofpizzalist: Number;
		let a: Pizza[];
	 a = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];

	 if(a.indexOf(pizza) !== -1){}
	 for (let i = 0; i < a.length; i++) {
		 if (a[i].id === pizza.id) {
			 numberofpizzalist = +a[i].numberofpizza + +1;
			 console.log(numberofpizzalist)
			 pizza.numberofpizza = numberofpizzalist;
			 console.log(pizza.numberofpizza)
			 a.splice(i, 1);
			 break;
		 };}
	 a.push(pizza);
	 setTimeout(() => {
		 window.sessionStorage.setItem('avct_item', JSON.stringify(a));
		 this.calculateLocalCartPizzaCounts();
	 }, 500); 
	}

	substractNumberOfPizzaToCart(pizza: Pizza): void {
		let numberofpizzalist: Number;
		let a: Pizza[];
	 a = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];

		if(pizza.numberofpizza === 1){this.removeLocalCartPizza(pizza);}
		else{

	 if(a.indexOf(pizza) !== -1){}
	 for (let i = 0; i < a.length; i++) {
		 if (a[i].id === pizza.id) {
			 numberofpizzalist = +a[i].numberofpizza - +1;
			 console.log(numberofpizzalist)
			 pizza.numberofpizza = numberofpizzalist;
			 console.log(pizza.numberofpizza)
			 a.splice(i, 1);
			 break;
		 };}
	 a.push(pizza);
	 setTimeout(() => {
		 window.sessionStorage.setItem('avct_item', JSON.stringify(a));
		 this.calculateLocalCartPizzaCounts();
	 }, 500); 
	}
	}

}
