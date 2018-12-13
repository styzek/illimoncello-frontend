import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Pizza } from 'src/app/domain/pizza';

@Component({
	selector: 'app-cart-calculator',
	templateUrl: './cart-calculator.component.html',
	styleUrls: [ './cart-calculator.component.scss' ]
})
export class CartCalculatorComponent implements OnInit, OnChanges {
	@Input() pizzas: Pizza[];

	totalValue = 0;
	constructor() {}

	ngOnChanges(changes: SimpleChanges) {
		const dataChanges: SimpleChange = changes.pizzas;

		const pizzas: Pizza[] = dataChanges.currentValue;
		this.totalValue = 0;
		pizzas.forEach((pizza) => {
			this.totalValue += (pizza.price * +pizza.numberofpizza);
		});
	}

	ngOnInit() {}
}
