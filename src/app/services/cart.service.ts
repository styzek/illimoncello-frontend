import { Injectable } from '@angular/core';
import { Ipizza } from '../domain/ipizza';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  navbarCartCount = 0;

  constructor() { }

  
  	/*
   ----------  Cart Product Function  ----------
  */

	// Adding new Pizza to cart db if logged in else window.sessionStorage
	addToCart(pizza: Ipizza): void {
    /* 		let mamap: HashMap<Number, Ipizza>; 
        mamap = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];
        mamap.set(pizza.id, pizza);
        setTimeout(() => {
          window.sessionStorage.setItem('avct_item', JSON.stringify(mamap));
        this.calculateLocalCartPizzaCounts();
        }, 500); */
         let a: Ipizza[];
        a = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];
        pizza.numberofpizza = 1;
        a.push(pizza);
        //this.toastrService.wait('Adding Pizza to Cart', 'Pizza Adding to the cart');
        setTimeout(() => {
          window.sessionStorage.setItem('avct_item', JSON.stringify(a));
          this.calculateLocalCartPizzaCounts();
        }, 500); 
      }
    
      // Removing cart from local
      removeLocalCartPizza(pizza: Ipizza) {
        const pizzas: Ipizza[] = JSON.parse(window.sessionStorage.getItem('avct_item'));
    
        for (let i = 0; i < pizzas.length; i++) {
          if (pizzas[i].id === pizza.id) {
            pizzas.splice(i, 1);
            break;
          }
        }
        // ReAdding the prizzas after remove
        window.sessionStorage.setItem('avct_item', JSON.stringify(pizzas));
    
        this.calculateLocalCartPizzaCounts();
      }
    
      // Fetching Locat CartsPizzats
      getLocalCartPizzas(): Ipizza[] {
        const pizzas: Ipizza[] = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];
    
        return pizzas;
      }
    
      // returning LocalCarts Product Count
      calculateLocalCartPizzaCounts() {
        this.navbarCartCount = this.getLocalCartPizzas().length;
      }
    
      //add a number of pizza in the cart
      addNumberOfPizzaToCart(pizza: Ipizza): void {
        let numberofpizzalist: Number;
        let a: Ipizza[];
       a = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];
    
       if(a.indexOf(pizza) !== -1){}
       for (let i = 0; i < a.length; i++) {
         if (a[i].id === pizza.id) {
           numberofpizzalist = +a[i].numberofpizza + +1;
           console.log(numberofpizzalist)
           pizza.numberofpizza = numberofpizzalist;
           console.log(pizza.numberofpizza)
           a.splice(i, 1);
           break;
         };}
       a.push(pizza);
       //this.toastrService.wait('Adding Pizza to Cart', 'Pizza Adding to the cart');
       setTimeout(() => {
         window.sessionStorage.setItem('avct_item', JSON.stringify(a));
         this.calculateLocalCartPizzaCounts();
       }, 500); 
      }
    
      substractNumberOfPizzaToCart(pizza: Ipizza): void {
        let numberofpizzalist: Number;
        let a: Ipizza[];
       a = JSON.parse(window.sessionStorage.getItem('avct_item')) || [];
    
        if(pizza.numberofpizza === 1){this.removeLocalCartPizza(pizza);}
        else{
    
       if(a.indexOf(pizza) !== -1){}
       for (let i = 0; i < a.length; i++) {
         if (a[i].id === pizza.id) {
           numberofpizzalist = +a[i].numberofpizza - +1;
           console.log(numberofpizzalist)
           pizza.numberofpizza = numberofpizzalist;
           console.log(pizza.numberofpizza)
           a.splice(i, 1);
           break;
         };}
       a.push(pizza);
       //this.toastrService.wait('Adding Pizza to Cart', 'Pizza Adding to the cart');
       setTimeout(() => {
         window.sessionStorage.setItem('avct_item', JSON.stringify(a));
         this.calculateLocalCartPizzaCounts();
       }, 500); 
      }
      }
}
