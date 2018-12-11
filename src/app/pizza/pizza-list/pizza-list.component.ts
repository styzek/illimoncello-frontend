import { Component, OnInit, Input } from '@angular/core';
import { PizzasService } from 'src/app/services/pizzas.service';
import { Pizza } from 'src/app/domain/pizza';
import { Category } from 'src/app/domain/category';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {

pizzas: Pizza[];
categories: Category[];

  constructor(private router: Router, private _service: PizzasService, private messageService : MessageService) { }

  ngOnInit() {

    this._service.getPizzasAll().subscribe(
      resp => {this.pizzas = resp;},
      err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getPizzasAll : ' + err));

     this._service.getAllCategory().subscribe(resp => {this.categories = resp;},
      err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getAllCategory : ' + err));
  }

  pizzaFilterCategory(namecategory: string)
  {
    this._service.getPizzaByCategory(namecategory).subscribe(resp => {this.pizzas = resp;},
      err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getPizzaByCategory : ' + err));
  }

  addToCart(pizza: Pizza) {
    this._service.addToCart(pizza);
    this.messageService.add({key: 'myKey1', severity:'success', summary: 'Success', detail: 'Pizza added to cart'});
  }
  
  addBestPizza(pizza: Pizza) {
	  this._service.addBestPizza(pizza, window.sessionStorage.getItem('currentuser'));
  }

  handleClick() {
    this.router.navigate(['/pizzacustom']);
}
}
