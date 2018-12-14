import {Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {Pizza} from 'src/app/domain/pizza';
import { PizzasService } from 'src/app/services/pizzas.service';

@Component({
  selector: 'app-cart-calculator',
  templateUrl: './cart-calculator.component.html',
  styleUrls: ['./cart-calculator.component.scss']
})
export class CartCalculatorComponent implements OnInit, OnChanges {
  @Input() pizzas: Pizza[];

  totalValue: number;

  constructor(private _pizzaService: PizzasService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const dataChanges: SimpleChange = changes.pizzas;

    const pizzas: Pizza[] = dataChanges.currentValue;
    
  this._pizzaService.getTotalValue(pizzas).subscribe(resp => this.totalValue = resp);
  }

  ngOnInit() {
  }
}
