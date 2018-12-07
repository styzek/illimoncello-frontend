import { Pizza } from "./pizza";

export interface Category {
    id: number;
    name: string;
    pizzas: Pizza[];
}
