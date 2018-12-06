import { Component, OnInit, Input } from '@angular/core';
import { PizzasService } from 'src/app/services/pizzas.service';
import { Ipizza } from 'src/app/domain/ipizza';
import { Icategory} from 'src/app/domain/icategory';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {

pizzas: Ipizza[];
categories: Icategory[];

  constructor(private touter: Router, private _service: PizzasService) { }


  ngOnInit() {

    this._service.getProductsAll().subscribe(
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

  addToCart(pizza: Ipizza) {
		this._service.addToCart(pizza);
  }
  
  addBestPizza(pizza:Ipizza)
  {
	  this._service.addBestPizza(pizza, window.sessionStorage.getItem('currentuser'))
  }
}
