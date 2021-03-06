import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {Pizza} from '../domain/pizza';
import {Category} from '../domain/category';
import {Ingredient} from '../domain/ingredient';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class PizzasService {
  navbarCartCount = 0;
  isLoggedIn: boolean;
  totalcart = new BehaviorSubject<number>(0);
  totalValue: number;

  constructor(private _http: HttpClient, private authserv: AuthService) {
  }

  private URL = 'http://localhost:8080/api/pizza';

  getTotalValue(pizzas: Pizza[]): Observable<number>{
    this.totalValue = 0;
    pizzas.forEach((pizza) => {
      this.totalValue += (pizza.price * +pizza.numberofpizza);
    });
    this.totalcart.next(this.totalValue);
    return this.totalcart.asObservable();
  }

  public getPizzasAll(): Observable<Pizza[]> {
    return this._http.get<Pizza[]>(this.URL + '/pizzas');
  }

  public getIngredientsAll(): Observable<Ingredient[]> {
    return this._http.get<Ingredient[]>(this.URL + '/ingredients');
  }

  public getBestPizzasAll(username: String): Observable<Pizza[]> {
    return this._http.get<Pizza[]>(this.URL + '/bestpizzas');
  }

  public getAllCategory(): Observable<Category[]> {
    return this._http.get<Category[]>(this.URL + '/categories');
  }

  public getProductById(id: number): Observable<Pizza> {
    return this._http.get<Pizza>(this.URL + '/' + id);
  }

  public getPizzaByCategory(name: string): Observable<Pizza[]> {
    return this._http.get<Pizza[]>(this.URL + '/pizzasbycategory/' + name);
  }


  public addBestPizza(pizza: Pizza, name: String): Observable<Pizza> {
    return this._http.post<Pizza>(this.URL + '/addbestpizza/' + name, pizza);
  }


  addPizzaCustom(ingredients: Ingredient[]): Observable<Pizza> {
	this.authserv.isLoggedIn().subscribe(value => this.isLoggedIn = value);
	if(this.isLoggedIn === true){
		return this._http.post<Pizza>(this.URL + '/setPizzaCustom', ingredients);
	}
	else{
	return this._http.post<Pizza>(this.URL + '/setPizzaCustomtoCart', ingredients);
	}
	
  }

  addPizzaParty(ingredients: Ingredient[]): Observable<Pizza> {
	this.authserv.isLoggedIn().subscribe(value => this.isLoggedIn = value);
	if(this.isLoggedIn === true){
		return this._http.post<Pizza>(this.URL + '/setPizzaParty', ingredients);
	}
	else{
	return this._http.post<Pizza>(this.URL + '/setPizzaPartytoCart', ingredients);
	}
  }

  /*
 ----------  Cart Product Function  ----------
*/

  // Adding new Pizza to cart db if logged in else window.sessionStorage
  addToCart(pizza: Pizza): void {
    let numberofpizzalist: Number;
    let a: Pizza[];
    a = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];
    pizza.numberofpizza = 1;
    console.log(JSON.stringify(pizza.ingredients) + JSON.stringify(pizza.id) + JSON.stringify(pizza.name));

    if (a.indexOf(pizza) !== -1) {
    }
    for (let i = 0; i < a.length; i++) {
      if ((JSON.stringify(a[i].ingredients) + JSON.stringify(a[i].id) + JSON.stringify(a[i].name)) === (JSON.stringify(pizza.ingredients) + JSON.stringify(pizza.id) + JSON.stringify(pizza.name))) {
        numberofpizzalist = +a[i].numberofpizza + +1;
        console.log(numberofpizzalist);
        pizza.numberofpizza = numberofpizzalist;
        console.log(pizza.numberofpizza);
        a.splice(i, 1);
        break;
      }
    }

    a.push(pizza);
    window.sessionStorage.setItem('avct_item', JSON.stringify(a));
    this.calculateLocalCartPizzaCounts();

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

    const a = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];

    if (a.indexOf(pizza) !== -1) {
    }
    for (let i = 0; i < a.length; i++) {
      if ((JSON.stringify(a[i].ingredients) + JSON.stringify(a[i].id) + JSON.stringify(a[i].name)) === (JSON.stringify(pizza.ingredients) + JSON.stringify(pizza.id) + JSON.stringify(pizza.name))) {
        numberofpizzalist = +a[i].numberofpizza + +1;
        console.log(numberofpizzalist);
        pizza.numberofpizza = numberofpizzalist;
        console.log(pizza.numberofpizza);
        a.splice(i, 1);
        break;
      }
    }
    a.push(pizza);
    this.getTotalValue(a);

    window.sessionStorage.setItem('avct_item', JSON.stringify(a));
    this.calculateLocalCartPizzaCounts();

  }

  substractNumberOfPizzaToCart(pizza: Pizza): void {
    let numberofpizzalist: Number;
    let a: Pizza[];
    a = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];

    if (pizza.numberofpizza === 1) {
      this.removeLocalCartPizza(pizza);
    }
    else {

      if (a.indexOf(pizza) !== -1) {
      }
      for (let i = 0; i < a.length; i++) {
        if ((JSON.stringify(a[i].ingredients) + JSON.stringify(a[i].id) + JSON.stringify(a[i].name)) === (JSON.stringify(pizza.ingredients) + JSON.stringify(pizza.id) + JSON.stringify(pizza.name))) {
          numberofpizzalist = +a[i].numberofpizza - +1;
          console.log(numberofpizzalist);
          pizza.numberofpizza = numberofpizzalist;
          console.log(pizza.numberofpizza);
          a.splice(i, 1);
          break;
        }
        ;
      }
      a.push(pizza);
      this.getTotalValue(a);

      window.sessionStorage.setItem('avct_item', JSON.stringify(a));
      this.calculateLocalCartPizzaCounts();

    }
  }


}
