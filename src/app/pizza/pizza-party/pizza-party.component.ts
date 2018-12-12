import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/domain/ingredient';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PizzasService } from 'src/app/services/pizzas.service';
import { Pizza } from 'src/app/domain/pizza';

@Component({
  selector: 'app-pizza-party',
  templateUrl: './pizza-party.component.html',
  styleUrls: ['./pizza-party.component.css']
})
export class PizzaPartyComponent implements OnInit {

  pizza: Pizza;
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
     this._service.addPizzaParty(this.selectedIngredients).subscribe(resp => this._service.addToCart(this.pizza = resp));
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
  ingredient.numberIngredient = 1;
  const key = this.selectedIngredients.indexOf(ingredient, 0);

  if ( key > -1){
    this.selectedIngredients.splice(key, 1);
  }

  this.availableIngredients.push(ingredient);

}

addNumberOfIngredientPizzaParty(ingredient: Ingredient)
{
  let numberofingredientlist: number;
  let a: Ingredient[];
 a = this.selectedIngredients;

 if(a.indexOf(ingredient) !== -1){}
 for (let i = 0; i < a.length; i++) {
   if (a[i].id === ingredient.id) {
    numberofingredientlist = +a[i].numberIngredient + +1;
     console.log(numberofingredientlist);
     ingredient.numberIngredient = numberofingredientlist;
     console.log(ingredient.numberIngredient);
     a.slice(i, 1);
     break;
 }
}
}

substractNumberOfIngredientPizzaParty(ingredient: Ingredient)
{
  let numberofingredientlist: number;
  let a: Ingredient[];
 a = this.selectedIngredients;

 if(ingredient.numberIngredient === 1){ 
  this.deleteItemClicked(ingredient);}
		else{
 if(a.indexOf(ingredient) !== -1){}
 for (let i = 0; i < a.length; i++) {
   if (a[i].id === ingredient.id) {
    numberofingredientlist = +a[i].numberIngredient - +1;
     console.log(numberofingredientlist);
     ingredient.numberIngredient = numberofingredientlist;
     console.log(ingredient.numberIngredient);
     a.slice(i, 1);
     break;
 }
}
}
}

}
