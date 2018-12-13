import {Category} from './category';
import {Ingredient} from './ingredient';

export interface Pizza {
  id: Number;
  name: string;
  price: number;
  month_promo: boolean;
  fixed: boolean;
  category: Category;
  numberofpizza: Number;
  ingredients: Ingredient[];
  imagePizza: string;
}
