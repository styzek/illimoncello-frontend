import { Ipizza } from "../domain/ipizza";


export interface CartState {
 loaded: boolean;
 pizzas : Ipizza[];

}