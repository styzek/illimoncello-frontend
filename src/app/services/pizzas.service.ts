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

	constructor(private _http: HttpClient) { } //private toastrService: ToastrService
		
  private URL = 'http://localhost:8080/api/pizza';

  public getProductsAll(): Observable<Ipizza[]> {
    return this._http.get<Ipizza[]>(this.URL+'/pizzas');
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

  public addProduct(p: Ipizza): Observable<any> {
    return this._http.post(this.URL, p);
  }
}
