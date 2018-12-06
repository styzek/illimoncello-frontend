import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../domain/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzasService {

  private URL = 'http://localhost:8080/pizzas';

  constructor(private _http: HttpClient) { }

  public getProductsAll(): Observable<Pizza[]> {
    return this._http.get<Pizza[]>(this.URL);
  }

  public getProductById(id: number): Observable<Pizza> {
    return this._http.get<Pizza>(this.URL + '/' + id);
  }

  public addProduct(p: Pizza): Observable<any> {
    return this._http.post(this.URL, p);
  }
}
