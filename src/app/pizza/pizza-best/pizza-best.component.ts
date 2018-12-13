
import { Pizza } from 'src/app/domain/pizza';
import { OnInit, Component } from '@angular/core';
import { PizzasService } from 'src/app/services/pizzas.service';

@Component({
	selector: 'app-pizza-best',
	templateUrl: './pizza-best.component.html',
	styleUrls: [ './pizza-best.component.scss' ]
})
export class BestPizzaComponent implements OnInit {
	
	bestPizzas: Pizza[];
	
	constructor(private _pizzaService: PizzasService) {}

	ngOnInit() {
		this._pizzaService.getBestPizzasAll(window.sessionStorage.getItem('currentuser')).subscribe(
			resp => {this.bestPizzas = resp;},
			err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getAll : ' + err));
	}

	addToCart(pizza: Pizza) {
		this._pizzaService.addToCart(pizza);
  }
}
