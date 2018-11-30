import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ipizza } from '../domain/ipizza';

@Injectable({
  providedIn: 'root'
})
export class PizzasService {

  private URL = 'http://localhost:8080/pizzas';

  constructor(private _http: HttpClient) { }

  public getProductsAll(): Observable<Ipizza[]> {
    return this._http.get<Ipizza[]>(this.URL);
  }

  public getProductById(id: number): Observable<Ipizza> {
    return this._http.get<Ipizza>(this.URL + '/' + id);
  }

  public addProduct(p: Ipizza): Observable<any> {
    return this._http.post(this.URL, p);
  }
}
