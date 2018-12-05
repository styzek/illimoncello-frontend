import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Ipizza } from 'src/app/domain/ipizza';

@Component({
	selector: 'app-cart-calculator',
	templateUrl: './cart-calculator.component.html',
	styleUrls: [ './cart-calculator.component.scss' ]
})
export class CartCalculatorComponent implements OnInit, OnChanges {
	@Input() pizzas: Ipizza[];

	totalValue = 0;
	constructor() {}

	ngOnChanges(changes: SimpleChanges) {
		const dataChanges: SimpleChange = changes.pizzas;

		const pizzas: Ipizza[] = dataChanges.currentValue;
		this.totalValue = 0;
		pizzas.forEach((pizza) => {
			this.totalValue += pizza.price;
		});
	}

	ngOnInit() {}
}
