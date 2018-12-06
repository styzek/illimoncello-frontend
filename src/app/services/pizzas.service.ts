import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ipizza } from '../domain/ipizza';
import { Icategory } from '../domain/icategory';

//import { ToastrService } from './toastr.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class PizzasService {

  navbarCartCount = 0;

	constructor(private _http: HttpClient) { } //private toastrService: ToastrService
		
  private URL = 'http://localhost:8080/api/pizza';

  public getProductsAll(): Observable<Ipizza[]> {
    return this._http.get<Ipizza[]>(this.URL+'/pizzas');
	}
	
	public getBestPizzasAll(username: String): Observable<Ipizza[]> {
    return this._http.get<Ipizza[]>(this.URL+'/bestpizzas');
  }

  public getAllCategory(): Observable<Icategory[]> {
    return this._http.get<Icategory[]>(this.URL+'/categories');
  }

  public getProductById(id: number): Observable<Ipizza> {
    return this._http.get<Ipizza>(this.URL + '/' + id);
  }

  public getPizzaByCategory(name:string): Observable<Ipizza[]>{
    return this._http.get<Ipizza[]>(this.URL + '/pizzasbycategory/' + name);
  }

  public addBestPizza(p: Ipizza, username: String): Observable<any> {
    return this._http.post(this.URL + '/addbestpizza/' + username, p);
  }

  	/*
   ----------  Cart Product Function  ----------
  */

	// Adding new Pizza to cart db if logged in else window.sessionStorage
	addToCart(pizza: Ipizza): void {

	 	let a: Ipizza[];
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
	removeLocalCartPizza(pizza: Ipizza) {
		const pizzas: Ipizza[] = JSON.parse(window.sessionStorage.getItem('avct_item'));

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
	getLocalCartPizzas(): Ipizza[] {
		const pizzas: Ipizza[] = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];

		return pizzas;
	}

	// returning LocalCarts Product Count
	calculateLocalCartPizzaCounts() {
		this.navbarCartCount = this.getLocalCartPizzas().length;
	}

	//add a number of pizza in the cart
	addNumberOfPizzaToCart(pizza: Ipizza): void {
		let numberofpizzalist: Number;
		let a: Ipizza[];
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

	substractNumberOfPizzaToCart(pizza: Ipizza): void {
		let numberofpizzalist: Number;
		let a: Ipizza[];
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
