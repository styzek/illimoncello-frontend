import { Pizza } from "../domain/pizza";


export interface CartState {
 loaded: boolean;
 pizzas: Pizza[];

}