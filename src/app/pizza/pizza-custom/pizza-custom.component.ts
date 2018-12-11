import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/domain/ingredient';
import { Pizzacustom } from 'src/app/domain/pizzacustom';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PizzasService } from 'src/app/services/pizzas.service';
import { Pizza } from 'src/app/domain/pizza';

@Component({
  selector: 'app-pizza-custom',
  templateUrl: './pizza-custom.component.html',
  styleUrls: ['./pizza-custom.component.css']
})
export class PizzaCustomComponent implements OnInit {

  pizzas: Pizza[];

  availableIngredients: Ingredient[];

    selectedIngredients: Ingredient[];

    draggedIngredient: Ingredient;


  registerForm: FormGroup;
  // pizza : Pizzacustom = {name: '', price: null, ingredients[]: Ingredients}

    constructor(private formBuilder: FormBuilder, private router: Router, private _service: PizzasService) { }

  ngOnInit() {

    this.selectedIngredients = [];
    this._service.getIngredientsAll().subscribe(
      resp => {
        this.availableIngredients = resp;
      }, err => console.log('*** Attention : Il y a eu erreur lors de l\'appel getPizzasAll : ' + err));
}

  onSubmit() {
      this._service.addPizzaCustom(this.selectedIngredients).subscribe();
      this.router.navigate(['welcome']);
  }

  dragStart(event,ingredient: Ingredient) {
    this.draggedIngredient = ingredient;
}

drop(event) {
    if(this.draggedIngredient) {
        let draggedIngredientIndex = this.findIndex(this.draggedIngredient);
        this.selectedIngredients = [...this.selectedIngredients, this.draggedIngredient];
        this.availableIngredients = this.availableIngredients.filter((val,i) => i!=draggedIngredientIndex);
        this.draggedIngredient = null;
    }
}

dragEnd(event) {
    this.draggedIngredient = null;
}

findIndex(ingredient: Ingredient) {
    let index = -1;
    for(let i = 0; i < this.availableIngredients.length; i++) {
        if(ingredient.id === this.availableIngredients[i].id) {
            index = i;
            break;
        }
    }
    return index;
}

deleteItemClicked(ingredient: Ingredient) {
  const key = this.selectedIngredients.indexOf(ingredient, 0);

  if ( key > -1){
    this.selectedIngredients.splice(key, 1);
  }

  this.availableIngredients.push(ingredient);

}

}
