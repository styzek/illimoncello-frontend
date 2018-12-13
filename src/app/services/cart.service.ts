import {Injectable} from '@angular/core';
import {Pizza} from '../domain/pizza';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private URL = 'http://localhost:8080/api/cart';
  name: String;

  constructor(private _http: HttpClient) {
  }


  public checkoutCart(pizzas: Pizza[]): Observable<any> {
    return this._http.put(this.URL + '/checkoutcart/' + sessionStorage.getItem('currentuser'), pizzas, {responseType: 'text'});
  }
}
