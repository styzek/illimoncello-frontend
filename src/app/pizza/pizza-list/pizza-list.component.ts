import { Component, OnInit } from '@angular/core';
import { PizzasService } from 'src/app/services/pizzas.service';
import { Pizza } from 'src/app/domain/pizza';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {

data: Pizza[];

  constructor(private _service: PizzasService) { }

  ngOnInit() {
    this._service.getProductsAll().subscribe(
      resp => this.data = resp,
      err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getAll : ' + err));
  }

}
