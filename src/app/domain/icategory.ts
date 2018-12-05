import { Ipizza } from "./ipizza";

export interface Icategory {
    id: number;
    name: String;
    pizzas: Ipizza[];
}
