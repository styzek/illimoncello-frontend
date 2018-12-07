import { Component, OnInit, Input } from '@angular/core';
import { PizzasService } from 'src/app/services/pizzas.service';
import { Pizza } from 'src/app/domain/pizza';
import { Category } from 'src/app/domain/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {

pizzas: Pizza[];
categories: Category[];

  constructor(private touter: Router, private _service: PizzasService) { }

  ngOnInit() {

    this._service.getPizzasAll().subscribe(
      resp => {this.pizzas = resp;},
      err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getAll : ' + err));

     this._service.getAllCategory().subscribe(resp => {this.categories = resp;},
      err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getAll : ' + err));
  }

  pizzaFilterCategory(namecategory: string)
  {
    this._service.getPizzaByCategory(namecategory).subscribe(resp => {this.pizzas = resp;},
      err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getAll : ' + err));
  }

  addToCart(pizza: Pizza) {
		this._service.addToCart(pizza);
  }
  
  addBestPizza(pizza: Pizza)
  {
	  this._service.addBestPizza(pizza, window.sessionStorage.getItem('currentuser'))
  }
}
