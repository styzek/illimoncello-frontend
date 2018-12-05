import { Icategory } from "./icategory";
import { IIngredient } from "./iingredient";

export interface Ipizza {
    id: Number;
    name: string;
    price: number;
    month_promo: boolean;
    fixed: boolean;
    category: Icategory;
    numberofpizza: Number;
    ingredients: IIngredient[];
    imagePizza:string;
}
