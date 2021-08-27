import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  
  total: any=0;
  shoppingCartItemCount: number=0;
  cart$: any;
  cart: any;
  items: any;
  
  constructor(private shoppingCartService:ShoppingCartService){   
}
async ngOnInit(){
  this.cart$=(await this.shoppingCartService.getCart()).valueChanges().subscribe(
    (cart:any)=>{
      this.total=0;
      if (cart) {
        this.items=Object.keys(cart.items); 
      console.log(this.items);
      
      this.cart=cart
      for(let productId in cart.items){

      this.shoppingCartItemCount+=cart.items[productId].quantity;
      this.total=this.total+(cart.items[productId].product.price*cart.items[productId].quantity);
    }
      }
      
})
}
}
